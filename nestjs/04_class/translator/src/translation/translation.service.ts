import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as md5 from 'md5';
import { JsonStorageService } from 'src/db/json-storage.service';
import { PaginationResult } from 'src/shared/pagination-query.dto';
import { Repository } from 'typeorm';
import {
  DeleteTranslationDTO,
  TranslationEntity,
  TranslationInsertDTO,
  TranslationUpdateDTO,
} from './entities/translation.entity';

@Injectable()
export class TranslationService {
  constructor(
    private jsonStorageService: JsonStorageService,
    @InjectRepository(TranslationEntity)
    private translationRepository: Repository<TranslationEntity>,
  ) {
    console.log('TranslationService instantiated');
  }

  getAll(): TranslationEntity[] {
    return this.jsonStorageService.get('translation');
  }

  get(pagination): PaginationResult<TranslationEntity> {
    return this.jsonStorageService.getPaginated<TranslationEntity>(
      'translation',
      pagination,
    );
  }

  async insert(translation: TranslationInsertDTO) {
    const toBeInsertedTransation = await this.translationRepository.preload({
      ...translation
    })
    toBeInsertedTransation.id = md5(translation.phrase);
    // translation.createdAt = new Date();
    // return this.jsonStorageService.save('translation', translation);

    return this.translationRepository.save(toBeInsertedTransation);
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
