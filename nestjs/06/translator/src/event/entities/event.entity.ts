import { IsOptional } from 'class-validator';
import { TranslationEntity } from '../../translation/entities/translation.entity';
import { UserEntity } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
