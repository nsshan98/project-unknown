import { Body, Controller, Post, Req } from '@nestjs/common';
import { AccommodationService } from './accommodation.service';
import { CreateAccommodationDto } from './dto/createAccommodation.dto';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/enum/role.enum';
import { AuthenticatedUser } from 'src/auth/decorators/authenticated-user.decorators';
import { User } from 'src/entities/user.entity';

@Controller('accommodation')
export class AccommodationController {
    constructor (private accommodationService: AccommodationService){}

    @Roles(Role.USER)
    @Post('create')
    createAccommodation(@Body() dto: CreateAccommodationDto, @AuthenticatedUser() user: User){ {
        return this.accommodationService.createAccommodation(dto, user)
    }
}
}
