import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiKeyEntity } from 'src/api-key/entities/api-key.entity';
import { EventEntity } from 'src/event/entities/event.entity';
import { TranslationEntity } from 'src/translation/entities/translation.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
