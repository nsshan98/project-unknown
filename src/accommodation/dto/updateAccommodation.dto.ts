import { PartialType } from "@nestjs/mapped-types";
import { CreateAccommodationDto } from "./createAccommodation.dto";

export class UpdateAccommodationDto extends PartialType(CreateAccommodationDto) {}