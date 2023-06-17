import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { EventEntity } from 'src/event/entities/event.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

export type Languages = 'en' | 'fa' | 'ar' | 'fr';
@Entity('translation')
export class TranslationEntity {
  constructor(input: Partial<TranslationEntity>) {
    Object.assign(this, input);
  }

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

  @OneToMany(() => EventEntity, (event) => event.user)
  events: EventEntity[];

  @Column({
    default: 0,
  })
  @IsOptional()
  likeCount?: number;
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
