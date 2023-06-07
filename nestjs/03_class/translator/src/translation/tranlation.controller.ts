import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { PaginationQuery } from 'src/shared/pagination-query.dto';
import { DeleteTranslationDTO, TranslationEntity, TranslationUpdateDTO } from './entities/translation.entity';
import { TranslationService } from './translation.service';

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
    console.log('>>>>', translation);
    return this.translationService.update(translation);
  }

  @Delete()
  DeleteTranslation(
    @Body() translation: DeleteTranslationDTO
  ) {
    return this.translationService.delete(translation)
  }
}
