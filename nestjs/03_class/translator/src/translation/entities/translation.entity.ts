import { OmitType, PartialType, PickType } from "@nestjs/mapped-types";
import { IsDate, IsString } from "class-validator";

export type Languages = 'en' | 'fa';
export class TranslationEntity {
  @IsString()
  id: string;

  @IsString()
  phrase: string;

  @IsString()
  translation: string;

  @IsString()
  fromLang: Languages;

  @IsString()
  toLang: Languages;

  @IsDate()
  createdAt: Date;
}

// const updateTranslationDTO: 
//   new () => Omit<TranslationEntity, 'createdAt' | 'id'>
//  = TranslationEntity;

export class TranslationUpdateDTO
  extends PartialType(OmitType(TranslationEntity
    , ['createdAt'] as const)) {
}

const a = {
  red: 'red1',
  blue: 5
} as const;

type t = typeof a[keyof typeof a]

export class DeleteTranslationDTO 
  extends PickType(
    TranslationEntity, ['id'] as const
    ) {
    
  }