import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreatePostDto } from '../dtos/create-post.dto';
import { CategoryEntity } from './category.entity';

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  location: string;

  @ManyToMany((type) => CategoryEntity, (category) => category.posts, {
    cascade: true,
  })
  @JoinTable()
  categories: CategoryEntity[];

  @Column({
    default: 0,
  })
  likeCount: number;
}
