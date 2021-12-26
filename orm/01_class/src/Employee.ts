import { Column, PrimaryColumn, Entity } from "typeorm";
import { Person } from "./Person";

@Entity("Employee")
export class Employee extends Person {
  @Column({
    type: "simple-json",
  })
  workAt: {
    name: string;
    address: string;
  } = {
    name: "",
    address: "",
  };

  @Column({
    type: "simple-array",
  })
  childrenNames: string[] = [];
}
