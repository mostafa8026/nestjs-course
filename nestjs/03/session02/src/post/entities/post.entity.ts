import { CategoryEntity } from './../../category/entities/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UserEntity } from 'src/user/entities/user.entity';

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

  @ManyToMany((type) => CategoryEntity, (category) => category.posts)
  @JoinTable()
  categories: CategoryEntity[];

  @ManyToOne((type) => UserEntity, (user) => user.posts)
  @JoinColumn()
  user: UserEntity;
}
