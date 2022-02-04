import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('appKey')
export class AppKeyEntity {
  @PrimaryColumn()
  key: string;
  @Column()
  name: string;
}
