import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { RoomTypes } from "../enum/roomTypes.enum";
import { Type } from "class-transformer";

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

    // @IsString()
    @IsOptional()
    image: string;

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
}