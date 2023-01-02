import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  // FOR SESSION
  // async canActivate(ctx: ExecutionContext) {
  //   const result = (await super.canActivate(ctx)) as boolean;
  //   const req = ctx.switchToHttp().getRequest();
  //   await super.logIn(req);
  //   return result;
  // }
}
