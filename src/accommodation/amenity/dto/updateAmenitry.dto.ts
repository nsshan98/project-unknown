import { PartialType } from "@nestjs/mapped-types";
import { CreateAccommodationDto } from "src/accommodation/dto/createAccommodation.dto";

export class UpdateAmenityDto extends PartialType(CreateAccommodationDto) {}