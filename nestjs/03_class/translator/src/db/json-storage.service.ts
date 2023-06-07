import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { PaginationQuery, PaginationResult } from 'src/shared/pagination-query.dto';

/**
 * json fromat:
 * translation: [{}, {}]
 * user: [{}, {}]
 */

type ResourceType = 'translation' | 'user';

@Injectable()
export class JsonStorageService {
  dbPath: string = 'db.json';

  constructor() {
    if (!fs.existsSync(this.dbPath)) {
      console.log('not exists')
      fs.writeFileSync(this.dbPath, '{"translation":[], "user": []}')
    }
  }

  get(resource: ResourceType) {
    const text = fs.readFileSync(this.dbPath, {
      encoding: 'utf-8'
    });
    const json = JSON.parse(text);
    return json[resource];
  }

  getPaginated<T>(resource: ResourceType, pagination: PaginationQuery): PaginationResult<T> {
    const items = this.get(resource);
    const start = (pagination.page - 1) * pagination.limit;
    const end = pagination.page * pagination.limit;
    const paginationResult: PaginationResult<T> = new PaginationResult();
    paginationResult.items = items.slice(start, end);
    paginationResult.total = items.length;
    return paginationResult;
  }

  getById(resource: ResourceType, id: string) {
    const items = this.get(resource);
    return items.find((item: any) => item.id === id);
  }

  save(resource: ResourceType, data: any) {
    const text = fs.readFileSync(this.dbPath, {
      encoding: 'utf-8'
    });
    const json = JSON.parse(text);
    json[resource].push(data);
    fs.writeFileSync(this.dbPath, JSON.stringify(json));
    return data;
  }

  updateById(resource: ResourceType, id: string, data: any) {
    const items = this.get(resource);
    const index = items.findIndex((item: any) => item.id === id);
    items[index] = {
      ...items[index],
      ...data
    }
    this.save(resource, items);
  }

  deleteById(resource: ResourceType, id: string) {
    const items = this.get(resource);
    const index = items.findIndex((item: any) => item.id === id);
    items.splice(index, 1);
    this.save(resource, items);
  }
}