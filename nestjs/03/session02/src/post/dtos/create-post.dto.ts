import { CategoryEntity } from './../../category/entities/category.entity';
import { IsArray, IsObject, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  location: string;

  @IsArray()
  categories: string[];
}
