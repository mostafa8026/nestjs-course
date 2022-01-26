import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
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

  @ManyToOne(() => UserEntity, (user) => user.posts)
  @JoinColumn()
  user: UserEntity;

  @Column({
    default: 0,
  })
  price: number;
}
