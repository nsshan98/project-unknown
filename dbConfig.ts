import { UserEntity } from "src/entities/user.entity";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export const pgConfig:PostgresConnectionOptions = {
    url:'postgresql://neondb_owner:npg_amvPo8uJjw5d@ep-noisy-night-a1sb1xtg-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
    type: 'postgres',
    port: 3306,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
}