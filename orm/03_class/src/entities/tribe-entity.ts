import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { HeroEntity } from "./hero-entity";
import { WarEntity } from "./war-entity";

@Entity("Tribe")
export class TribeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => HeroEntity, (hero) => hero.relatedTribe)
  heroes: HeroEntity[];

  @ManyToMany(() => WarEntity)
  @JoinTable({
    name: "WarsResult",
    joinColumn: {
      name: "tribeId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "warId",
      referencedColumnName: "id",
    },
  })
  wars: WarEntity[];
}
