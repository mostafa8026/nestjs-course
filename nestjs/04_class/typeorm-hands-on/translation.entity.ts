import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EventEntity } from "./events.entity";
import { MetaDataEntity } from "./metadata.entity";
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

  @OneToOne(()=>MetaDataEntity, (metadata) => metadata.translation)
  metadata: MetaDataEntity;

  @ManyToMany(()=>UserEntity, (user)=>user.translations)
  users: UserEntity[];

  @OneToMany(()=>EventEntity, (event) => event.translation)
  events: EventEntity[];
}