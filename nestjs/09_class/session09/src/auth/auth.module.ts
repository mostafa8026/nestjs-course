import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/repositories/user-repository.repository';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { UtilityModule } from 'src/utility/utility.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { UserSecurityService } from './user-sercurity.service';

@Module({
  imports: [
    UtilityModule,
    PassportModule,
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [AuthService, LocalStrategy, UserSecurityService],
  exports: [AuthService],
})
export class AuthModule {}
