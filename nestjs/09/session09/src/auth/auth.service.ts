import { UserSecurityService } from './user-security.service';
import { UtilityService } from './../utility/utility.service';
import { UserService } from 'src/user/user.service';
import { Injectable } from '@nestjs/common';
import { string } from 'joi';

@Injectable()
export class AuthService {
  constructor(
    private readonly userSecurityService: UserSecurityService,
    private readonly utilityService: UtilityService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userSecurityService.findByUsername(username);
    console.log(password);
    console.log(user.password);
    console.log(this.utilityService.comparePassword(password, user.password));
    if (await this.utilityService.comparePassword(password, user.password)) {
      return user;
    }
  }
}
