import { IsNumber, IsOptional, IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiKeyEntity } from '../../api-key/entities/api-key.entity';
import { EventEntity } from './../../event/entities/event.entity';
import { TranslationEntity } from './../../translation/entities/translation.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column()
  @IsString()
  name: string;

  @JoinTable()
  @ManyToMany(() => TranslationEntity, (translation) => translation.users)
  @IsOptional()
  translations?: TranslationEntity[];

  @OneToMany(() => EventEntity, (event) => event.user)
  @IsOptional()
  events?: EventEntity[];

  @OneToMany(() => ApiKeyEntity, (apiKey) => apiKey.user)
  apiKeys: ApiKeyEntity[];
}
