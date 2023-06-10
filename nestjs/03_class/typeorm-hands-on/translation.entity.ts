import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('translation')
export class TranslationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phrase: string;

  @Column({
    nullable: true
  })
  translation: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(()=>UserEntity, (user)=>user.translations)
  users: UserEntity[];
}