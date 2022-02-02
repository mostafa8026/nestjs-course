import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'Title of the post',
    example: 'New post',
  })
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  location: string;

  @IsString({ each: true })
  categories: string[];
}
