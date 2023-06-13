import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JsonStorageModule } from 'src/json-storage/json-storage.module';
import { NestOpenaiModule } from '../nest-openai/nest-openai.module';
import { TranslationEntity } from './entities/translation.entity';
import { TranslationController } from './tranlation.controller';
import { TranslationService } from './translation.service';
import { MyLoggerModule } from '../my-logger/my-logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TranslationEntity]),
    JsonStorageModule,
    NestOpenaiModule,
  ],
  controllers: [TranslationController],
  providers: [TranslationService],
  exports: [TypeOrmModule],
})
export class TranslationModule {}
