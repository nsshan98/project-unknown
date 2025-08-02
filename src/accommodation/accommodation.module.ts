import { Module } from '@nestjs/common';
import { AccommodationService } from './accommodation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accommodation } from 'src/entities/accommodation.entity';
import { AccommodationController } from './accommodation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Accommodation])],
  controllers: [AccommodationController],
  providers: [AccommodationService]
})
export class AccommodationModule {}
