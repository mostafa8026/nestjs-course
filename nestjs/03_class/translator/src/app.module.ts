import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { TranslationController } from './translation/tranlation.controller';
import { TranslationService } from './translation/translation.service';
import { JsonStorageService } from './db/json-storage.service';

@Module({
  imports: [],
  controllers: [AppController, UsersController, TranslationController],
  providers: [AppService, TranslationService, JsonStorageService],
})
export class AppModule {}
