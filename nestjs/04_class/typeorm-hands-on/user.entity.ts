import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TranslationEntity } from "./translation.entity";
import { EventEntity } from "./events.entity";

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @JoinTable()
  @ManyToMany(
    () => TranslationEntity,
    (translation) => translation.users,
  )
  translations: TranslationEntity[];

  @OneToMany(()=>EventEntity, (event) => event.user)
  events: EventEntity[];
}