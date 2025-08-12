import { Module } from '@nestjs/common';
import { AccommodationService } from './accommodation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accommodation } from 'src/entities/accommodation.entity';
import { AccommodationController } from './accommodation.controller';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { Amenity } from 'src/entities/amenity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Accommodation, Amenity]), CloudinaryModule],
  controllers: [AccommodationController],
  providers: [AccommodationService, CloudinaryService]
})
export class AccommodationModule {}
