import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants().secret,
    });
  }
  // this automatically check the bearer in header and if it passes the auth, then the below validate is run

  async validate(payload) {
    // const user = this.userServices.findOne(payload.username)
    return { id: payload.sub, username: payload.username }; // saves in req.user
  }
}
