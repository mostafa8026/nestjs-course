import {DataSource} from 'typeorm'
import { Photo } from './photo.entity';

const datasource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    entities: [Photo],
    synchronize: true,
});

datasource.initialize().then(() => {
    console.log('Datasource initialized');
}).catch((err) => {
    console.log('Error initializing datasource', err);
});

datasource.manager.save(new Photo())