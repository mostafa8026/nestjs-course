import { Module } from '@nestjs/common';
import { LanguageModule } from 'src/language/language.module';

@Module({
  imports: [LanguageModule],
  exports: [LanguageModule],
})
export class LanguageValidationModule {}
