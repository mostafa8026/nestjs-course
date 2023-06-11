import { TranslationEntity } from 'src/translation/entities/translation.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('event')
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  eventType: 'like' | 'dislike' | 'comment' | 'share';

  @ManyToOne(() => UserEntity, (user) => user.events)
  user: UserEntity;

  @ManyToOne(() => TranslationEntity, (translation) => translation.events)
  translation: TranslationEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
