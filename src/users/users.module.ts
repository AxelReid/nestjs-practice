import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Task } from './entities/task.entity';
import { AbilityFactory } from 'src/ability/ability.factory';
@Module({
  imports: [TypeOrmModule.forFeature([User, Task])],
  controllers: [UsersController],
  providers: [UsersService, AbilityFactory],
  exports: [UsersService],
})
export class UsersModule {}
