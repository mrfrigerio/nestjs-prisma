import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/typeorm/entities/User';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UserNotFoundException } from 'src/users/exceptions/UserNotFound.exception';
import { comparePasswords, encodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async getUsers(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return users;
  }
  async validateUser(email: string, password: string) {
    const userExists = await this.usersRepository.findOne({ where: { email } });
    if (!userExists) throw new UserNotFoundException('User not found!');
    const validPassword = await comparePasswords(password, userExists.password);
    if (!validPassword)
      throw new ForbiddenException('Password does not match!');
    return userExists;
  }
  async createUser(data: CreateUserDto) {
    const { email, password } = data;
    const hashedPassword = await encodePassword(password);
    const userExists = await this.usersRepository.findOne({
      where: {
        email,
      },
    });
    if (userExists) {
      throw new HttpException('User already exists!', HttpStatus.FORBIDDEN);
    }
    const user = this.usersRepository
      .create({ ...data, password: hashedPassword })
      .save();
    return user;
  }

  async findUserByEmail(email: string) {
    const user = this.usersRepository.findOne({ where: { email } });
    if (!user) throw new UserNotFoundException('User not found!');
    return user;
  }
}
