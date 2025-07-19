import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export default (): PostgresConnectionOptions => ({
  url: process.env.DATABASE_URL,
  type: 'postgres',
//   port: 3000,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
});

console.log(process.env.url, 'db.config.ts');
