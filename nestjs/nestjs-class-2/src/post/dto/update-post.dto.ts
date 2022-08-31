import { IsNumber, IsString, MaxLength } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(
    CreatePostDto,
) {}
