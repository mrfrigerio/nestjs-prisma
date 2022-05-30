import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/services/prisma.service';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: 'USER_SERVICE',
      useClass: UsersService,
    },
    PrismaService,
  ],
})
export class UsersModule {}
