import { IsNumber, IsString, MaxLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, Table } from 'typeorm';

@Entity('Post')
export class PostEntity {
    @IsNumber()
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    @MaxLength(10)
    @Column()
    name: string;
}
