import { Injectable } from '@nestjs/common';
import * as md5 from 'md5';
import { JsonStorageService } from 'src/db/json-storage.service';
import { TranslationEntity, TranslationUpdateDTO } from './entities/translation.entity';
import { PaginationResult } from 'src/shared/pagination-query.dto';

@Injectable()
export class TranslationService {
  constructor(
    private jsonStorageService: JsonStorageService
  ) {
    console.log('TranslationService instantiated')
  }

  getAll(): TranslationEntity[] {
    return this.jsonStorageService.get('translation');
  }

  get(pagination): PaginationResult<TranslationEntity> {
    return this.jsonStorageService.getPaginated<TranslationEntity>('translation', pagination);
  }

  insert(translation: TranslationEntity) {
    translation.id = md5(translation.phrase);
    translation.createdAt = new Date();
    return this.jsonStorageService.save('translation', translation);
  }

  update(translation: TranslationUpdateDTO) {
    return this.jsonStorageService.updateById('translation', translation.id, translation)
  }

}
