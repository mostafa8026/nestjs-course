import { Body, Controller, Post, Put } from '@nestjs/common';
import { TranslationEntity, TranslationUpdateDTO } from './entities/translation.entity';
import { TranslationService } from './translation.service';

@Controller('translation')
export class TranslationController {
  constructor(
    private translationService: TranslationService
  ){
    console.log('TranslationController instantiated')
  }

  @Post()
  insertTranslation(
    @Body() translation: TranslationEntity
  ) {
    return this.translationService.insert(translation);
  }

  @Put()
  updateTranslation(
    @Body() translation: TranslationUpdateDTO
  ) {
    return this.translationService.update(translation);
  }
}
