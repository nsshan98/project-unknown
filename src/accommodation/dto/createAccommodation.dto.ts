import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { RoomTypes } from "../enum/roomTypes.enum";

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

    @IsString()
    @IsNotEmpty()
    image: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    bedrooms: number;

    @IsBoolean()
    @IsNotEmpty()
    has_high_commode: boolean;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    price_per_night: number;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    max_guests: number;

    @IsString()
    @IsOptional()
    check_in_time?: Date;

    @IsString()
    @IsOptional()
    check_out_time?: Date;

    @IsString()
    @IsNotEmpty()
    location: string;
}