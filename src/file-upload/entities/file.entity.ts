import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class File {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  filename: string;

  @ApiProperty()
  @Column()
  path: string;

  @ApiProperty()
  @Column()
  size: number;

  @ApiProperty()
  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.uploads)
  user: User;
}
