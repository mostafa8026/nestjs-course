import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { TranslationEntity } from "./translation.entity";

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

}