import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranslationEntity } from 'src/translation/entities/translation.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { EventEntity } from './entities/event.entity';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { TranslationModule } from 'src/translation/translation.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventEntity]),
    TranslationModule,
    UsersModule,
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
