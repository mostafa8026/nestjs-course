import { IsString } from 'class-validator';
import { Languages } from '../entities/translation.entity';

export class TranslateRequestDTO {
  @IsString()
  sourceLang: Languages;
  
  @IsString()
  targetLang: Languages;

  @IsString()
  phrase: string;
}
