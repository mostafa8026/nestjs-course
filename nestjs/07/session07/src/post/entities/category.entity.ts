import { NotifyEntity } from 'src/notify/entities/notify.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostEntity } from './post.entity';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => PostEntity, (post) => post.categories)
  posts: PostEntity[];

  @OneToMany(() => NotifyEntity, (notify) => notify.user)
  notifies: NotifyEntity[];
}
