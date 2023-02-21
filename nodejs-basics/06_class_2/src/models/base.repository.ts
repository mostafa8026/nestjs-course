import { promises as fs } from 'fs';
import path from 'path'

/**
 * T is the type of the interface
 * and M is the type of the model
 */
export class BaseRepository<T extends { id?: number }> {
  private readonly filePath: string;
  private readonly dbFolder: string;

  constructor(private readonly tableName: string) {
    this.dbFolder = './db';
    this.tableName = tableName;
    this.filePath = path.join(this.dbFolder, `${tableName}.json`);
    this.initializeDbFile();
  }

  /**
   * this function will create the db folder and the json file if it doesn't exist
   */
  private async initializeDbFile(): Promise<void> {
    try {
      await fs.access(this.filePath);
    } catch (err) {
      await fs.mkdir(this.dbFolder, { recursive: true });
      await fs.writeFile(this.filePath, '[]', 'utf8');
    }
  }

  public async getAll(): Promise<T[]> {
    const rawData = await fs.readFile(this.filePath, 'utf8');
    return JSON.parse(rawData) as T[];
  }

  public async getById(id: number): Promise<T | undefined> {
    const rawData = await fs.readFile(this.filePath, 'utf8');
    const data = JSON.parse(rawData) as T[];
    console.log(typeof data);
    return data.find((item: any) => item.id === id);
  }

  public async create(data: T): Promise<T> {
    const rawData = await fs.readFile(this.filePath, 'utf8');
    const allData = JSON.parse(rawData) as T[];
    const lastItem = allData[allData.length - 1];
    const newId = lastItem ? (lastItem.id || 0) + 1 : 1;
    const newData = { ...data, id: newId };
    allData.push(newData);
    await fs.writeFile(this.filePath, JSON.stringify(allData, null, 2), 'utf8');
    return newData as T;
  }

  public async update(data: T): Promise<T> {
    const rawData = await fs.readFile(this.filePath, 'utf8');
    const allData = JSON.parse(rawData) as T[];
    const index = allData.findIndex((item: any) => item.id === (data as any).id);
    if (index >= 0) {
      allData[index] = { id: data.id, ...data } as T;
      await fs.writeFile(this.filePath, JSON.stringify(allData, null, 2), 'utf8');
      return allData[index];
    }
    throw new Error(`Record not found with id ${data.id}`);
  }

  public async delete(id: number): Promise<T> {
    const rawData = await fs.readFile(this.filePath, 'utf8');
    const allData = JSON.parse(rawData) as T[];
    const index = allData.findIndex((item: any) => item.id === id);
    const dataToBeDeleted = allData[index];
    if (index >= 0) {
      allData.splice(index, 1);
      await fs.writeFile(this.filePath, JSON.stringify(allData, null, 2), 'utf8');
      return dataToBeDeleted;
    }
    throw new Error(`Record not found with id ${id}`);
  }
}
