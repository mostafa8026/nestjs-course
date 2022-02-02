import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [AuthModule, PassportModule],
  providers: [LocalStrategy],
  exports: [LocalStrategy],
})
export class StrategiesModule {}
