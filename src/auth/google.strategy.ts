import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { google } from './constants';

export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: google().clientID,
      clientSecret: google().clientSecret,
      callbackURL: google().callbackURL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    done(null, profile);
  }
}
