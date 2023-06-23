import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('language')
export class LanguageEntity {
  @PrimaryColumn()
  @IsString()
  @ApiProperty({
    example: 'Mostafa',
  })
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

  @Column({
    default: true,
    nullable: true
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;
}
