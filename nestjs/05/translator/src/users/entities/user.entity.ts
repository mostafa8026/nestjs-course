import { IsOptional } from 'class-validator';
import { EventEntity } from 'src/event/entities/event.entity';
import { TranslationEntity } from 'src/translation/entities/translation.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @JoinTable()
  @ManyToMany(() => TranslationEntity, (translation) => translation.users)
  translations: TranslationEntity[];

  @OneToMany(() => EventEntity, (event) => event.translation)
  @IsOptional()
  events?: EventEntity[];
}