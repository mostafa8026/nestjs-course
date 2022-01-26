import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('config')
export class ConfigEntity {
  @PrimaryColumn()
  key: string;

  @Column()
  value: string;
}
