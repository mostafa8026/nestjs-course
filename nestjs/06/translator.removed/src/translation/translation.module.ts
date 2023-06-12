import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JsonStorageModule } from 'src/json-storage/json-storage.module';
import { TranslationEntity } from './entities/translation.entity';
import { TranslationController } from './tranlation.controller';
import { TranslationService } from './translation.service';

@Module({
  imports: [TypeOrmModule.forFeature([TranslationEntity]), JsonStorageModule],
  controllers: [TranslationController],
  providers: [TranslationService],
  exports: [TypeOrmModule],
})
export class TranslationModule {}
