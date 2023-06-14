import { PickType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';
import { EventEntity } from '../entities/event.entity';

export class EventDTO extends PickType(EventEntity, ['type'] as const) {
  @IsString()
  translationId: string;

  @IsNumber()
  userId: number;
}
