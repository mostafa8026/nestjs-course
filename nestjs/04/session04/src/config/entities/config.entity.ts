import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('config')
export class ConfigEntity {
  @PrimaryColumn({
    unique: true,
  })
  key: string;

  @Column()
  value: string;
}
