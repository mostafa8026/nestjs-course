import { CategoryEntity } from './../../post/entities/category.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('notify')
export class NotifyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @ManyToOne(() => UserEntity, (user) => user.notifies)
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.notifies)
  @JoinColumn()
  category: CategoryEntity;
}
