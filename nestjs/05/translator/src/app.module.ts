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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'translation',
      username: 'postgres',
      password: 'postgres',
      synchronize: true,
      entities: [TranslationEntity, UserEntity],
    }),
    TypeOrmModule.forFeature([TranslationEntity, UserEntity]),
  ],
  controllers: [AppController, UsersController, TranslationController],
  providers: [AppService, TranslationService, JsonStorageService],
})
export class AppModule {}
