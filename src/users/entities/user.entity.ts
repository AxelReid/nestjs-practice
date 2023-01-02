import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Meeting } from './meeting.entity';
import { Task } from './task.entity';
import { UserProfile } from './user-profile.entity';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  // @Index({ fulltext: true })
  @Column({ unique: true })
  username: string;

  @Column(/*{ select: false }*/)
  password: string;

  @ManyToOne(() => User, (user) => user.directReports, {
    onDelete: 'SET NULL',
  })
  manager: User;

  @OneToMany(() => User, (user) => user.manager)
  directReports: User[];

  @OneToOne(() => UserProfile, (profile) => profile.user, {
    eager: true, // automatically adds to relations
  })
  profile: UserProfile;

  @OneToMany(() => Task, (task) => task.user, { cascade: true })
  tasks: Task[];

  @ManyToMany(() => Meeting, (meeting) => meeting.attendees)
  @JoinTable()
  meetings: Meeting[];
}
