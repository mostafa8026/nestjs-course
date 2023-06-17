import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TranslationEntity } from 'src/translation/entities/translation.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { EventDTO } from './dtos/event.dto';
import { EventEntity } from './entities/event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private eventRepo: Repository<EventEntity>,
    @InjectRepository(TranslationEntity)
    private translationRepo: Repository<TranslationEntity>,
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    private datasource: DataSource,
  ) {}

  async like(eventLike: EventDTO) {
    /** user */
    const user = await this.userRepo.findOneBy({
      id: eventLike.userId,
    });

    const event = this.datasource.manager.transaction(
      async (transactionalManager) => {
        /** translation */
        const translation = await transactionalManager.findOneBy(
          TranslationEntity,
          {
            id: eventLike.translationId,
          },
        );

        /** create event */
        let event = new EventEntity({
          ...eventLike,
          user,
          translation,
        });
        event = await transactionalManager.save(event);

        /** translation like + 1 */
        translation.likeCount = (translation.likeCount || 0) + 1;
        await transactionalManager.save(translation);

        return event;
      },
    );

    /** return event */
    return event;
  }
}
