import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JsonStorageService } from './db/json-storage.service';
import { TranslationEntity } from './translation/entities/translation.entity';
import { TranslationController } from './translation/tranlation.controller';
import { TranslationService } from './translation/translation.service';
import { UserEntity } from './users/entities/user.entity';
import { UsersController } from './users/users.controller';
import { EventController } from './event/event.controller';
import { EventService } from './event/event.service';
import ds from 'datasource';
import { EventEntity } from './event/entities/event.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...ds.options,
      autoLoadEntities: true,
      logging: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([TranslationEntity, UserEntity, EventEntity]),
  ],
  controllers: [
    AppController,
    UsersController,
    TranslationController,
    EventController,
  ],
  providers: [AppService, TranslationService, JsonStorageService, EventService],
})
export class AppModule {}
