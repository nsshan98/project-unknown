import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AccommodationController } from './accommodation/accommodation.controller';
import { AccommodationModule } from './accommodation/accommodation.module';
import dbConfig from './config/db.config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    expandVariables: true,
    load: [dbConfig]
  }),UserModule,AccommodationModule, TypeOrmModule.forRootAsync({
    useFactory: dbConfig,
  }), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
