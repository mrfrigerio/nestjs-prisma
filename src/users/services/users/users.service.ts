import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/services/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async getUsers(): Promise<Omit<User, 'password'>[]> {
    const users = await this.prismaService.user.findMany({
      select: {
        id: true,
        username: true,
        password: false,
        email: true,
      },
    });
    return users;
  }

  async getUserByUsername(
    username: string,
  ): Promise<Omit<User, 'password'>[] | undefined> {
    const user = await this.prismaService.user.findMany({
      where: {
        username: {
          contains: username,
        },
      },
      select: {
        id: true,
        username: true,
        password: false,
        email: true,
      },
    });
    return user;
  }

  async getUserById(id: number): Promise<Omit<User, 'password'> | undefined> {
    const user = await this.prismaService.user.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        password: false,
        email: true,
      },
    });
    return user;
  }

  async createUser(data: CreateUserDto) {
    const userExists = await this.prismaService.user.findFirst({
      where: {
        email: data.email,
      },
    });
    if (!userExists) {
      return this.prismaService.user.create({
        data,
      });
    }
    throw new HttpException('User already exists!', HttpStatus.FORBIDDEN);
  }
}
