import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Task } from './entities/task.entity';
import { User } from './entities/user.entity';

const relations = ['tasks'];

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(Task) private tasksRepo: Repository<Task>,
  ) {}

  async seed() {
    //
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
