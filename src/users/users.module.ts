import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserProfile } from './entities/user-profile.entity';
import { Task } from './entities/task.entity';
import { Meeting } from './entities/meeting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserProfile, Task, Meeting])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
