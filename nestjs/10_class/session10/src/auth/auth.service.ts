import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { UtilityService } from 'src/utility/utility.service';
import { UserSecurityService } from './user-sercurity.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userSecurityService: UserSecurityService,
    private readonly utilityService: UtilityService,
    private readonly jwtService: JwtService,
  ) {}
  async validate(username: string, password: string) {
    const user = await this.userSecurityService.findByUsername(username);

    if (await this.utilityService.compare(password, user.password)) {
      return user;
    }

    return null;
  }

  async createToken(user: UserEntity) {
    const token = {
      token: this.jwtService.sign({
        sub: user.id,
        name: user.name,
      }),
    };

    return token;
  }
}
