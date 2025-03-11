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
    entities: ['build/entity/**/*.js', 'src/entity/**/*.ts'],
    synchronize: false,
    migrations: ['build/migration/**/*.js', 'src/migration/**/*.ts'],
    subscribers: ['build/subscriber/**/*.js', 'src/subscriber/**/*.ts'],
});
