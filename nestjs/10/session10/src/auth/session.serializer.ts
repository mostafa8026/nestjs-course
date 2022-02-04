import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: Function) {
    // we can serialize user object in another way, like just saving the id
    done(null, user);
  }

  deserializeUser(payload: any, done: Function) {
    // we can deserialize the session in a custom way, like when you serialize in {id} way, then you have to find
    // the complete object by utilizing the userService
    done(null, payload);
  }
}
