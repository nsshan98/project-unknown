import { Body, Controller, Post } from '@nestjs/common';
import { AccommodationService } from './accommodation.service';
import { CreateAccommodationDto } from './dto/createAccommodation.dto';

@Controller('accommodation')
export class AccommodationController {
    constructor (private accommodationService: AccommodationService){}

    @Post('create')
    createAccommodation(@Body() dto: CreateAccommodationDto){ {
        return this.accommodationService.createAccommodation(dto)
    }
}
}
