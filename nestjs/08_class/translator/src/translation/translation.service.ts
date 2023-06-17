import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as md5 from 'md5';
import { JsonStorageService } from 'src/json-storage/json-storage.service';
import { PaginationQuery } from 'src/shared/pagination-query.dto';
import { DataSource, Repository } from 'typeorm';
import {
  DeleteTranslationDTO,
  TranslationEntity,
  TranslationInsertDTO,
  TranslationUpdateDTO,
} from './entities/translation.entity';
import { MyLoggerService } from '../my-logger/my-logger.service';

@Injectable()
export class TranslationService {
  constructor(
    private jsonStorageService: JsonStorageService,
    @InjectRepository(TranslationEntity)
    private translationRepository: Repository<TranslationEntity>,
    private datasource: DataSource,
    private loggerService: MyLoggerService,
  ) {
    this.loggerService.setContext(TranslationService.name);
    console.log('TranslationService instantiated');
  }

  getAll(): Promise<TranslationEntity[]> {
    this.loggerService.log('inside service get all called')
    return this.datasource.manager.find(TranslationEntity);
  }

  get(pagination: PaginationQuery) {
    const { page, limit } = pagination;
    return this.translationRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async insert(translation: TranslationInsertDTO) {
    const newTranslation = new TranslationEntity(translation);
    newTranslation.id = md5(translation.phrase);

    return this.translationRepository.save(newTranslation);
  }

  update(translation: TranslationUpdateDTO) {
    return this.jsonStorageService.updateById(
      'translation',
      translation.id,
      translation,
    );
  }

  delete(translation: DeleteTranslationDTO) {
    return this.jsonStorageService.deleteById('translation', translation.id);
  }
}
