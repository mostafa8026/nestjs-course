import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EventEntity } from '../../event/entities/event.entity';
import { TranslationEntity } from '../../translation/entities/translation.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @JoinTable()
  @ManyToMany(() => TranslationEntity, (translation) => translation.users)
  translations: TranslationEntity[];

  @OneToMany(() => EventEntity, (event) => event.user)
  events: EventEntity[];
}
