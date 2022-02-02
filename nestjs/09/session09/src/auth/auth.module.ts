import { UserEntity } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSecurityService } from './user-security.service';
import { StrategiesModule } from './../strategies/strategies.module';
import { UtilityModule } from 'src/utility/utility.module';
import { UserModule } from 'src/user/user.module';
import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [UtilityModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [AuthService, UserSecurityService],
  exports: [AuthService, UserSecurityService],
})
export class AuthModule {}
