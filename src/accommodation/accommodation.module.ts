import { Module } from '@nestjs/common';
import { AccommodationService } from './accommodation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accommodation } from 'src/entities/accommodation.entity';
import { AccommodationController } from './accommodation.controller';
import { UploadService } from 'src/cloudinary/upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([Accommodation])],
  controllers: [AccommodationController],
  providers: [AccommodationService, UploadService]
})
export class AccommodationModule {}
