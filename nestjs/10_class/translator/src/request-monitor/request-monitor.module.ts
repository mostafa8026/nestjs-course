import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestMonitorEntity } from 'src/request-monitor/entities/request-monitor.entity';
import { RequestMonitorController } from './request-monitor.controller';
import { RequestMonitorService } from './request-monitor.service';

@Module({
  imports: [TypeOrmModule.forFeature([RequestMonitorEntity])],
  controllers: [RequestMonitorController],
  providers: [RequestMonitorService],
  exports: [RequestMonitorService],
})
export class RequestMonitorModule {}
