import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TranslationEntity } from "./translation.entity";
import { UserEntity } from "./user.entity";

export enum EventTypeEnum {
  LIKE = 'LIKE',
  COMMENT = 'COMMENT',
}

@Entity('event')
export class EventEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: EventTypeEnum;

  @ManyToOne(()=>UserEntity, (user)=>user.events)
  user: UserEntity;

  @ManyToOne(()=>TranslationEntity, (translation) => translation.events)
  translation: TranslationEntity;

  @CreateDateColumn()
  createdAt: Date;
}