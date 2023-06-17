import {
  NestOpenaiRequestScopeService,
  NestOpenaiService,
} from '@mostafa8026/nest-openai';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PaginationQuery } from 'src/shared/pagination-query.dto';
import { MyLoggerService } from '../my-logger/my-logger.service';
import { TranslateRequestDTO } from './dtos/translation-request.dto';
import {
  DeleteTranslationDTO,
  TranslationInsertDTO,
  TranslationUpdateDTO,
} from './entities/translation.entity';
import { TranslationService } from './translation.service';

@Controller('translation')
export class TranslationController {
  constructor(
    private translationService: TranslationService,
    private openaiService: NestOpenaiService,
    private openaiRequestScopeService: NestOpenaiRequestScopeService,
    private loggerService: MyLoggerService,
  ) {
    this.loggerService.setContext(TranslationController.name);
    console.log('TranslationController instantiated');
  }

  @Get()
  getAll() {
    this.loggerService.log('inside controller getAll called');
    return this.translationService.getAll();
  }

  @Get('/paginated')
  getTranslationPaginated(@Query() pagination: PaginationQuery) {
    console.log('>>>>', typeof pagination.limit);
    console.log('>>>>', typeof pagination.page);
    return this.translationService.get(pagination);
  }

  @Post()
  insertTranslation(@Body() translation: TranslationInsertDTO) {
    return this.translationService.insert(translation);
  }

  @Put()
  updateTranslation(@Body() translation: TranslationUpdateDTO) {
    console.log('>>>>', translation);
    return this.translationService.update(translation);
  }

  @Delete()
  DeleteTranslation(@Body() translation: DeleteTranslationDTO) {
    return this.translationService.delete(translation);
  }

  @Post('/translate')
  translate(
    @Body('sourceLang') sourceLang: string,
    @Body('targetLang') targetLang: string,
    @Body('phrase') phrase: string,
  ) {
    return this.openaiService.translate(sourceLang, targetLang, phrase);
  }

  @Post('/translate-by-api-key')
  translateByApiKey(@Body() translateRequest: TranslateRequestDTO) {
    return this.openaiRequestScopeService.translate(
      translateRequest.sourceLang,
      translateRequest.targetLang,
      translateRequest.phrase,
    );
  }
}
