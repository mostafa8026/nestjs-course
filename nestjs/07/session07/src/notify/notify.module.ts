import { NotifyEntity } from './entities/notify.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { NotifyController } from './notify.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NotifyEntity])],
  controllers: [NotifyController],
  providers: [NotifyService],
})
export class NotifyModule {}
