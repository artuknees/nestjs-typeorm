import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
// import { Client } from 'pg';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './../config';

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';

@Global() // es un modulo global. cualquier inyectable sera visto por los demas servicios.
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, dbName, password, port } = configService.postgres;
        return {
          type: 'postgres',
          host: host,
          port: port,
          username: user,
          password: password,
          database: dbName,
          synchronize: true, // sincronizar con la db
          autoLoadEntities: true, // auto genera las tablas
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
  ],
  exports: ['API_KEY', TypeOrmModule],
})
export class DatabaseModule {}
