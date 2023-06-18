import { IsDate, IsOptional, IsString } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('language')
export class LanguageEntity {
  @PrimaryColumn()
  @IsString()
  name: string;

  @Column({
    unique: true,
  })
  @IsString()
  shortName: string;

  @CreateDateColumn()
  @IsDate()
  @IsOptional()
  createdAt?: Date;
}
