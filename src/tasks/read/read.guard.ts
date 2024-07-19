import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ReadGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const role: string = req.headers["x-role"]

   if (!role || (role != 'admin' && role != 'user')) throw new UnauthorizedException()
   return (role == 'admin' || role == 'user')
  }
}
