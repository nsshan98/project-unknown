import { IsBoolean, IsOptional } from 'class-validator';

export class AmenityDto {
  @IsBoolean()
  @IsOptional()
  has_wifi?: boolean;

  @IsBoolean()
  @IsOptional()
  has_balcony?: boolean;

  @IsBoolean()
  @IsOptional()
  has_parking_space?: boolean;

  @IsBoolean()
  @IsOptional()
  has_elevator?: boolean;
}
