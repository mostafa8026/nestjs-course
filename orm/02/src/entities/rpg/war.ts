import { Tribe } from './tribe';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class War {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @ManyToMany(
      () => Tribe
  )
  @JoinTable({
      name: 'WarTribe',
      joinColumn: {
          name: 'tribeId',
          referencedColumnName: 'id',
      },
      inverseJoinColumn: {
          name: 'warId',
          referencedColumnName: 'id'
      }
  })
  relatedTribes: Tribe[]
}
