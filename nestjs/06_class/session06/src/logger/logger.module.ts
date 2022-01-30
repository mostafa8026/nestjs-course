import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExceptionLogEntity } from './entities/exception-log.entity';
import { LoggerService } from './logger.service';
import { ExceptionLogService } from './exception-log/exception-log.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExceptionLogEntity])],
  providers: [LoggerService, ExceptionLogService],
  exports: [LoggerService, ExceptionLogService],
})
export class LoggerModule {}
