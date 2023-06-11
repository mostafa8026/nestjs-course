import { OmitType } from '@nestjs/mapped-types';
import { EventEntity } from '../entities/event.entity';
import { IsNumber, IsString } from 'class-validator';

export class CreateEventDTO extends OmitType(EventEntity, [
  'id',
  'user',
  'translation',
  'createdAt',
  'updatedAt',
] as const) {
  @IsString()
  translationId: string;

  @IsNumber()
  userId: number;
}
