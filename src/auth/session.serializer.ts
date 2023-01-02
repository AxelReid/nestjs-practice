import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user, done: (err: Error, user) => void) {
    // done(null, { username: user.username }); // only save username to session
    done(null, user);
  }
  deserializeUser(payload, done: (err: Error, payload) => void) {
    // const user = this.userService.findOne(payload.username);
    done(null, payload); // get back user object from session not just username
  }
}
