import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranslationModule } from 'src/translation/translation.module';
import { UserModule } from 'src/user/user.module';
import { EventEntity } from './entities/event.entity';
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventEntity]),
    TranslationModule,
    UserModule,
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
