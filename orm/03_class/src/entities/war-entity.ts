import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TribeEntity } from "./tribe-entity";

@Entity("War")
export class WarEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  location: string;

  @ManyToMany(() => TribeEntity)
  @JoinTable({
    name: "WarsResult",
    joinColumn: {
      name: "warId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "tribeId",
      referencedColumnName: "id",
    },
  })
  tribes: TribeEntity[];
}
