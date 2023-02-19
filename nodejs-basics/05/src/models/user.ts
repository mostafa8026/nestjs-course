import { UserInterface } from "../interfaces/user.interface";
import { BaseRepository } from "./base.model";

export class User extends BaseRepository<UserInterface, User> implements UserInterface {
  public id?: number;
  public name: string;
  public email: string;
  public password: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor() {
    super('users');
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const data = await this.getAll();
    return data.find((user) => user.email === email);
  }
}
