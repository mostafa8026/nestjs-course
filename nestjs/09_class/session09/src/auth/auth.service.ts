import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user-repository.repository';
import { UserService } from 'src/user/user.service';
import { UtilityService } from 'src/utility/utility.service';
import { UserSecurityService } from './user-sercurity.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userSecurityService: UserSecurityService,
    private readonly utilityService: UtilityService,
    private readonly userRepository: UserRepository
  ) {}
  async validate(username: string, password: string) {
    const user = await this.userRepository.findByUsername(username);

    if (await this.utilityService.compare(password, user.password)) {
      return user;
    }

    return null;
  }
}
