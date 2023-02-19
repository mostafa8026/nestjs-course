import { BaseRepository } from "./base.repository";

export interface BookInterface {
  id: number;
  name: string;
}

export class BookModel extends BaseRepository<BookInterface, BookModel> {
  id: number;
  name: string;
}