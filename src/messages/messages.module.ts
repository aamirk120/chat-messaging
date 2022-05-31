import { AuthService } from 'src/services/auth/auth.service';
import { PrismaService } from '../services/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, PrismaService, AuthService]
})
export class MessagesModule {}
