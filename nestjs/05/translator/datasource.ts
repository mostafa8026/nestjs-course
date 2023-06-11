import { DataSource } from 'typeorm';

const ds = new DataSource({
  type: 'postgres',
  migrations: ['src/migrations/*.ts'],
  entities: ['src/entities'],
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
});

export default ds;
