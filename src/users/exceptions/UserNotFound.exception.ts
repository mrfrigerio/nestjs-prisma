import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor(message = 'User not found', statusCode = HttpStatus.BAD_REQUEST) {
    super(message, statusCode);
  }
}
