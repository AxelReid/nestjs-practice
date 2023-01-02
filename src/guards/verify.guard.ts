import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class VerifyGuard implements CanActivate {
  canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest();

    return req.isAuthenticated();
  }
}
