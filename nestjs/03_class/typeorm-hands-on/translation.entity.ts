import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('translation')
export class TranslationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phrase: string;

  @Column({
    nullable: true
  })
  translation: string;

  @CreateDateColumn()
  createdAt: Date;
}