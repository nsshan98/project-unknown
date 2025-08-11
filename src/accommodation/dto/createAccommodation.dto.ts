import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsPositive, IsString, ValidateNested } from "class-validator";
import { RoomTypes } from "../enum/roomTypes.enum";
import { Type } from "class-transformer";
import { CreateAmenityDto } from "../amenity/dto/createAmenity.dto";


class ImageDto  {
    @IsString()
    @IsNotEmpty()
    image_url: string;

    @IsString()
    @IsNotEmpty()
    image_public_id: string;
}

export class CreateAccommodationDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(RoomTypes)
    @IsNotEmpty()
    type: RoomTypes;

    @ValidateNested()
    @Type(() => ImageDto)
    @IsOptional()
    image?: ImageDto;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @Type(() => Number)
    bedrooms: number;

    @IsBoolean()
    @IsNotEmpty()
    @Type(() => Boolean)
    has_high_commode: boolean;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @Type(() => Number)
    price_per_night: number;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @Type(() => Number)
    max_guests: number;

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    check_in_time?: Date;

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    check_out_time?: Date;

    @IsString()
    @IsNotEmpty()
    location: string;

    @ValidateNested()
    @Type(() => CreateAmenityDto)
    @IsNotEmpty()
    amenity: CreateAmenityDto
}