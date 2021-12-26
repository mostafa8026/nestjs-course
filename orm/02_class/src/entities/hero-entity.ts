import {
    BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TribeEntity } from "./tribe-entity";

@Entity('Hero')
export class HeroEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => TribeEntity, (tribe) => tribe.heroes)
  @JoinColumn({
    name: "tribeId",
  })
  relatedTribe: TribeEntity;
}
