import { AuthService } from 'src/services/auth/auth.service';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, AuthService]
})
export class UsersModule {}
