// import { PartialType } from "@nestjs/mapped-types";
// import { CreateAccommodationDto } from "./createAccommodation.dto";

// export class UpdateAccommodationDto extends PartialType(CreateAccommodationDto) {}


import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateAccommodationDto } from './createAccommodation.dto';
import { IsBoolean, IsOptional } from 'class-validator';

class UpdateAmenityDto {
  @IsOptional()
  @IsBoolean()
  has_wifi?: boolean;

  @IsOptional()
  @IsBoolean()
  has_balcony?: boolean;

  @IsOptional()
  @IsBoolean()
  has_parking_space?: boolean;

  @IsOptional()
  @IsBoolean()
  has_elevator?: boolean;
}

// Remove amenity from base DTO, then extend partial of rest, then add your own amenity
export class UpdateAccommodationDto extends PartialType(
  OmitType(CreateAccommodationDto, ['amenity'] as const),
) {
  @IsOptional()
  amenity?: UpdateAmenityDto;
}
