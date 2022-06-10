import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly usersService: UsersService,
  ) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get('search')
  async findUserByUsername(@Body() { username }: { username: string }) {
    // const user = await this.usersService.getUserByUsername(username);
    // if (user) return user;
    // throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
  }

  @Get('/search/:id')
  async findUserById(@Param('id', ParseIntPipe) id: number) {
    // const user = await this.usersService.getUserById(id);
    // if (user) return user;
    // throw new UserNotFoundException('Usuário não encontrado');
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  async createUser(@Body() data: CreateUserDto) {
    const user = await this.usersService.createUser(data);
    return user;
  }

  @Post('login')
  async login(@Body() data: { email: string; password: string }) {
    const user = await this.usersService.validateUser(
      data.email,
      data.password,
    );
    return user;
  }
}
