import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { AuthService } from './services/auth/auth.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, }), UsersModule, MessagesModule],
  controllers: [],
  providers: [AuthService],
})
export class AppModule { }
