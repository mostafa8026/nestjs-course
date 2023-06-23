import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TranslationEntity } from 'src/translation/entities/translation.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { EventDTO } from './dtos/event.dto';
import { EventEntity, EventTypeEnum } from './entities/event.entity';

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

  findAll() {
    return this.eventRepo.find();
  }

  async like(eventLike: EventDTO) {
    eventLike.type = EventTypeEnum.LIKE;
    /** user */
    const user = await this.userRepo.findOneBy({
      id: eventLike.userId,
    });

    let event;
    const queryRunner = this.datasource.createQueryRunner();
    try {
      queryRunner.startTransaction();
      /** translation */
      const translation = await queryRunner.manager.findOneBy(
        TranslationEntity,
        {
          id: eventLike.translationId,
        },
      );

      /** create event */
      event = new EventEntity({
        ...eventLike,
        user,
        translation,
      });
      event = await queryRunner.manager.save(event);

      /** translation like + 1 */
      translation.likeCount = (translation.likeCount || 0) + 1;
      await queryRunner.manager.save(translation);

      queryRunner.commitTransaction();
    } catch (error) {
      queryRunner.rollbackTransaction();
      throw error;
    } finally {
      queryRunner.release();
    }

    /** return event */
    return event;
  }
}
