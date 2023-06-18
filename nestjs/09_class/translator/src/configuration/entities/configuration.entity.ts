import { IsString } from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('configuration')
export class ConfigurationEntity {
  @Column()
  @IsString()
  @PrimaryColumn()
  key: string;

  @Column()
  @IsString()
  @PrimaryColumn()
  value: string;
}
