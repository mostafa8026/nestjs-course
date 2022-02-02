import { StrategiesModule } from './../strategies/strategies.module';
import { AuthModule } from './../auth/auth.module';
import { UtilityModule } from 'src/utility/utility.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyModule } from 'src/currency/currency.module';
import { LoggerModule } from 'src/logger/logger.module';
import { UserEntity } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    CurrencyModule.forRoot(false),
    LoggerModule,
    UtilityModule,
    StrategiesModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
