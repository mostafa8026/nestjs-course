import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

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
    if(!fs.existsSync(this.dbPath)){
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

  getById(resource: ResourceType, id: string) {
    const items = this.get(resource);
    return items.find((item: any) => item.id === id);
  }

  save(resource: ResourceType, data: any) {
    const text = fs.readFileSync(this.dbPath, {
      encoding: 'utf-8'
    });
    console.log('text', text);
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