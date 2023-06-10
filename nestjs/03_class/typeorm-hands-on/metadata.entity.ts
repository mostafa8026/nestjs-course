import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TranslationEntity } from "./translation.entity";

@Entity('metadata')
export class MetaDataEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  origin: string;

  @JoinColumn()
  @OneToOne(
    () => TranslationEntity
  )
  translation: TranslationEntity;
}