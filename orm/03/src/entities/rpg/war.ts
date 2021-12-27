import { Tribe } from "./tribe";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  BaseEntity,
} from "typeorm";

@Entity()
export class War extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @ManyToMany(() => Tribe)
  @JoinTable({
    name: "WarTribe",
    joinColumn: {
      name: "warId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "tribeId",
      referencedColumnName: "id",
    },
  })
  relatedTribes: Tribe[];
}
