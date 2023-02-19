import { BaseRepository } from "./base.repository";

export interface UserModelInterfase {
  id: number;
  name: string;
  password: string;
}


export class UserModel extends BaseRepository<UserModelInterfase, UserModel> {
  id: number;
  name: string;
  password: string;

}