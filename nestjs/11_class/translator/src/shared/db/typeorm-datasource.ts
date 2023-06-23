import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

const datasource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: process.env.DB_NAME,
  username: 'postgres',
  password: 'postgres',
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/shared/db/migrations/*.ts'],
});

export default datasource;
