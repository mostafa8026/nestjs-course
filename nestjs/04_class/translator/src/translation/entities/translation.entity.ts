import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryColumn,
} from 'typeorm';

export type Languages = 'en' | 'fa';
@Entity('translation')
export class TranslationEntity {
  @IsString()
  @PrimaryColumn()
  id: string;

  @IsString()
  @Column()
  phrase: string;

  @IsString()
  @Column()
  translation: string;

  @IsString()
  @Column({
    default: 'en',
  })
  fromLang: Languages;

  @IsString()
  @Column({
    default: 'fa',
  })
  toLang: Languages;

  @IsDate()
  @CreateDateColumn()
  @IsOptional()
  createdAt?: Date;

  @ManyToMany(() => UserEntity, (user) => user.translations)
  @IsOptional()
  users?: UserEntity[];
}

export class TranslationInsertDTO extends OmitType(TranslationEntity, [
  'id',
] as const) {}

export class TranslationUpdateDTO extends PartialType(
  OmitType(TranslationEntity, ['createdAt'] as const),
) {}

export class DeleteTranslationDTO extends PickType(TranslationEntity, [
  'id',
] as const) {}
