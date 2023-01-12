import { ApiProperty } from '@nestjs/swagger';
import { File } from 'src/file-upload/entities/file.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task } from './task.entity';

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
  @ApiProperty()
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @ManyToMany(() => Task, (task) => task.user, { cascade: true })
  tasks: Task[];

  @OneToMany(() => File, (file) => file.user, { eager: true })
  uploads: File[];
}
