import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum EventTypes {
  Liked = 'LIKED',
  Commented = 'COMMENTED',
}

@Entity('event')
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'nvarchar',
    length: 20,
  })
  message: EventTypes;

  @Column()
  refType: string;

  @Column()
  refId: number;
}
