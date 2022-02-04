import { Injectable } from '@nestjs/common';
import { hashSync, compare } from 'bcrypt';

@Injectable()
export class UtilityService {
  hash(input: string) {
    return hashSync(input, 10);
  }

  compare(password: string, hashedPassword: string) {
      return compare(password, hashedPassword);
  }
}
