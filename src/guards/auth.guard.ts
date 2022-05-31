import { AuthService } from 'src/services/auth/auth.service';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) { }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization;
    const user_data = this.authService.validateToken(token);

    if (user_data) {
      request.user = user_data;
      return true;
    }

    return false;
  }
}
