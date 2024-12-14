import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'remote',
    password: 'dev123',
    database: 'drteeth',
    logging: false,
    entities: ['src/entity/**/*.ts'],
    synchronize: false,
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
});
