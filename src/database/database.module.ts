import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'platzi_store',
  password: '2209',
  port: 5432,
});

client.connect();

@Global() // es un modulo global. cualquier inyectable sera visto por los demas servicios.
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      // Comparto el cliente de postgres aca
      provide: 'PG',
      useValue: client,
    },
  ],
  exports: ['API_KEY', 'PG'],
})
export class DatabaseModule {}
