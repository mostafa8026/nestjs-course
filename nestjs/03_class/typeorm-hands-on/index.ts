import { DataSource } from 'typeorm';
import { MetaDataEntity } from './metadata.entity';
import { TranslationEntity } from './translation.entity';
import { UserEntity } from './user.entity';

const datasource = new DataSource({
  type: 'mssql',
  host: 'localhost',
  port: 1433,
  database: 'translation',
  username: 'sa',
  password: '123@456dD',
  synchronize: true,
  entities: [TranslationEntity, MetaDataEntity,
    UserEntity],
  logging: true,
  options: {
    encrypt: false
  }
})

datasource.initialize().then(() => {
  console.log('DataSource initialized');
}).catch((err) => {
  console.error('Datasource initialization falied', err);
})

export { datasource };
