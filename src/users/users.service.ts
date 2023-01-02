import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Meeting } from './entities/meeting.entity';
import { Task } from './entities/task.entity';
import { UserProfile } from './entities/user-profile.entity';
import { User } from './entities/user.entity';

const relations = ['manager', 'tasks', 'directReports', 'meetings'];

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(UserProfile)
    private profileRepo: Repository<UserProfile>,
    @InjectRepository(Meeting)
    private meetingRepo: Repository<Meeting>,
    @InjectRepository(Task) private tasksRepo: Repository<Task>,
  ) {}

  async seed() {
    // user 1 CEO
    const ceo = this.usersRepo.create({ username: 'Mr. CEO' });
    await this.usersRepo.save(ceo);

    const ceoProfile = this.profileRepo.create({
      phone: '+998999877153',
      // userId: ceo.id
      user: ceo,
    });
    await this.profileRepo.save(ceoProfile);

    // user 2 Manager (me)
    const manager = this.usersRepo.create({
      username: 'Asilbek Dev',
      manager: ceo,
    });

    const task1 = this.tasksRepo.create({ name: 'Hire people' });
    // await this.tasksRepo.save(task1); // cascade: true (no need to manually save)
    const task2 = this.tasksRepo.create({ name: 'Present to CEO' });
    // await this.tasksRepo.save(task2); // cascade: true (no need to manually save)

    // tasks for Manager
    manager.tasks = [task1, task2];

    // meeting for CEO
    const meeting1 = this.meetingRepo.create({ zoomUrl: 'meeting.com' });
    meeting1.attendees = [ceo];
    await this.meetingRepo.save(meeting1);

    // Manager joined meeting1
    manager.meetings = [meeting1];

    this.usersRepo.save(manager);
  }

  findAll(name?: string) {
    if (name) {
      return this.usersRepo.find({
        where: { username: Like(`%${name}%`) },
        relations,
      });
    }
    return this.usersRepo.find({ relations });
  }

  async findOne(username: string) {
    const user = await this.usersRepo.findOne({
      where: { username: username },
      relations,
    });

    // do this for more complex queries like groupBy, where clauses, orderBy, .etc
    // const user = await this.usersRepo
    //   .createQueryBuilder('user')
    //   .leftJoinAndSelect('user.profile', 'profile')
    //   .leftJoinAndSelect('user.manager', 'manager')
    //   .leftJoinAndSelect('user.directReports', 'directReports')
    //   .leftJoinAndSelect('user.tasks', 'tasks')
    //   .leftJoinAndSelect('user.meetings', 'meetings')
    //   .where('user.id = :userId', { userId: id })
    //   .getOne();
    if (user) return user;
    throw new NotFoundException();
  }

  async create(user: CreateUserDto) {
    try {
      const newUser = this.usersRepo.create(user);
      return await this.usersRepo.save(newUser);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async update(username: string, updateUserDto: UpdateUserDto) {
    // return this.usersRepository.update(id, updateUserDto); // return response not created user object
    const user = await this.findOne(username);
    return this.usersRepo.save({ ...user, ...updateUserDto });
  }

  async delete(username: string) {
    // return this.usersRepository.delete(id);
    const user = await this.findOne(username);
    return this.usersRepo.remove(user);
  }
}
