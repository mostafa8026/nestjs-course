import { IsNumber, IsString, MaxLength } from 'class-validator';
import { PostEntity } from '../entities/post.entity';

export class CreatePostDto extends PostEntity {}
