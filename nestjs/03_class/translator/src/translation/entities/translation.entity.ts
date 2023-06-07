import { IsDate, IsString } from "class-validator";
import { OmitType, PartialType } from "@nestjs/mapped-types";

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
      , ['createdAt'] as const)){
}