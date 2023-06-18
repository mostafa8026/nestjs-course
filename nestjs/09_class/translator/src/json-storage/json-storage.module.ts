import { Module } from '@nestjs/common';
import { JsonStorageService } from './json-storage.service';

@Module({
  providers:[JsonStorageService],
  exports: [JsonStorageService],
})
export class JsonStorageModule {}
