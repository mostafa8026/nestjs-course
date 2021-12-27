import { Tribe } from "./tribe";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  BaseEntity,
} from "typeorm";

@Entity()
export class Hero extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Tribe, (tribe) => tribe.heroes, {
    onDelete: "SET NULL",
  })
  @JoinColumn({
    name: "tribeId",
  })
  relatedTribe: Tribe;
}
