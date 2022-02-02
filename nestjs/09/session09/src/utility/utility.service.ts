import { Injectable } from '@nestjs/common';
import { hashSync, compare } from 'bcrypt';

@Injectable()
export class UtilityService {
  private hashSaltRounds = 10;

  hashPassword(password: string) {
    return hashSync(password, this.hashSaltRounds);
  }

  comparePassword(password: string, hashPassword: string) {
    return compare(password, hashPassword);
  }
}
