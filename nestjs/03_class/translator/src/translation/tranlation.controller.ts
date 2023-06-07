import { Body, Controller, Get, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TranslationEntity, TranslationUpdateDTO } from './entities/translation.entity';
import { TranslationService } from './translation.service';
import { PaginationQuery } from 'src/shared/pagination-query.dto';

@Controller('translation')
export class TranslationController {
  constructor(
    private translationService: TranslationService
  ) {
    console.log('TranslationController instantiated')
  }

  @Get()
  getTranslationPaginated(@Query() pagination: PaginationQuery) {
    console.log(typeof pagination.limit)
    console.log(typeof pagination.page)
    return this.translationService.get(pagination);
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
