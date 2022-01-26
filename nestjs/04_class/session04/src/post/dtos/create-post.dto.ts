import { IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  location: string;

  @IsString({each: true})
  categories: string[];
}
