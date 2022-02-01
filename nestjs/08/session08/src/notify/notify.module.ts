import { Module } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { NotifyController } from './notify.controller';

@Module({
  controllers: [NotifyController],
  providers: [NotifyService]
})
export class NotifyModule {}
