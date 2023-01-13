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
import { CheckAbilities } from 'src/ability/decorators/abilities.decorator';
import { Action } from 'src/ability/action.enum';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { AbilitiesGuard } from 'src/ability/guards/abilities.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('seed')
  async seed() {
    await this.usersService.seed();
    return 'Seed complete';
  }

  @Get()
  @ApiOkResponse({ type: [User] })
  @ApiQuery({ name: 'name', required: false })
  getUsers(@Query('name') name?: string) {
    return this.usersService.findAll(name);
  }

  @Get(':id')
  @ApiOkResponse({ type: User })
  getUser(@Param('id') username: string) {
    return this.usersService.findOne(username);
  }

  @Post()
  @ApiCreatedResponse({ type: User })
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: User })
  updateUser(@Param('id') username: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(username, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: User })
  removeUser(@Param('id') username: string) {
    return this.usersService.delete(username);
  }
}
