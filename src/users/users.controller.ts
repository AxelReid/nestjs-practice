import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('seed')
  async seed() {
    await this.usersService.seed();
    return 'Seed complete';
  }

  @ApiOkResponse({ type: [User] })
  @ApiQuery({ name: 'name', required: false })
  @Get()
  getUsers(@Query('name') name?: string) {
    return this.usersService.findAll(name);
  }

  @ApiOkResponse({ type: User })
  @Get(':id')
  getUser(@Param('id') username: string) {
    return this.usersService.findOne(username);
  }

  @ApiCreatedResponse({ type: User })
  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @UseGuards(LocalAuthGuard)
  @Patch(':id')
  updateUser(@Param('id') username: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(username, body);
  }

  @UseGuards(LocalAuthGuard)
  @Delete(':id')
  removeUser(@Param('id') username: string) {
    return this.usersService.delete(username);
  }
}
