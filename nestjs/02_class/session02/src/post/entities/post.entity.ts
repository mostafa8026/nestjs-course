import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreatePostDto } from '../dtos/create-post.dto';

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

  categories: string[];
}
