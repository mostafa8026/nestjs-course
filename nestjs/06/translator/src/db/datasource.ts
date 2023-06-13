import { DataSource } from 'typeorm';

const datasource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'translation',
  username: 'postgres',
  password: 'postgres',
  synchronize: true,
  migrations: ['src/db/migrations/*.ts'],
  entities: ['src/**/*.entity.ts'],
});

export default datasource;
