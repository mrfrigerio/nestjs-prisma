import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';

@Injectable()
export class AuthService {
  constructor(@Inject('USER_SERVICE') private usersService: UsersService) {}
  async validateUser(email: string, password: string) {
    const user = await this.usersService.validateUser(email, password);
    return user;
  }
}
