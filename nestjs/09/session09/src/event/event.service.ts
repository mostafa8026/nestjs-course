import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RefTypeEnum } from 'src/enums/ref-type.enum';
import { Repository } from 'typeorm';
import { EventEntity, EventTypes } from './entities/event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}
  async getEventByUser(
    refId: number,
    refType: RefTypeEnum,
    userId: number,
    type: EventTypes,
  ) {
    const events = await this.eventRepository.find({
      where: {
        refId,
        refType,
        userId,
        type,
      },
    });

    return events;
  }
}
