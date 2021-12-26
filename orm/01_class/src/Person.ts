import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("Person")
export class Person {
  @PrimaryColumn({
    type: "int",
  })
  id: number = -1;

  @Column({
    type: "nvarchar",
  })
  name: string = "";

  @Column({
    type: "int",
    default: 18,
  })
  age: number = 10;

  @CreateDateColumn()
  createdAt: Date;
}
