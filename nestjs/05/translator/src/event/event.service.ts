import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { EventEntity } from './entities/event.entity';
import { CreateEventDTO } from './dtos/create-event.dto';
import { TranslationEntity } from 'src/translation/entities/translation.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class EventService {
  constructor(
    private datasource: DataSource,
    @InjectRepository(EventEntity)
    private eventRepository: Repository<EventEntity>,
    @InjectRepository(TranslationEntity)
    private translationRepository: Repository<TranslationEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async likeEvent(event: CreateEventDTO) {
    console.log('liking', event);
    /** find related translation */
    const translation = await this.translationRepository.findOneBy({
      id: event.translationId,
    });
    console.log('liking11');
    /** find related user */
    const user = await this.userRepository.findOneBy({
      id: event.userId,
    });
    /** create event */
    const newEvent = new EventEntity();
    newEvent.translation = translation;
    newEvent.user = user;
    newEvent.eventType = 'like';

    if (translation) translation.likeCount = translation?.likeCount || 0 + 1;

    await this.translationRepository.save(translation);
    return this.eventRepository.save(newEvent);
  }
}
