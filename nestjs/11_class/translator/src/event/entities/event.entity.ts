import { IsOptional } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { TranslationEntity } from './../../translation/entities/translation.entity';

export enum EventTypeEnum {
  LIKE = 'LIKE',
  COMMENT = 'COMMENT',
}

@Entity('event')
export class EventEntity {
  constructor(input: Partial<EventEntity>) {
    Object.assign(this, input);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: EventTypeEnum;

  @ManyToOne(() => UserEntity, (user) => user.events)
  user: UserEntity;

  @ManyToOne(() => TranslationEntity, (translation) => translation.events)
  translation: TranslationEntity;

  @CreateDateColumn()
  @IsOptional()
  createdAt?: Date;
}
