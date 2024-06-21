import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config(); // puede buscar en otra cosa que no sea .env

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.TYPEORM_DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
});
