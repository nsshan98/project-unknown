import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AccommodationService } from './accommodation.service';
import { CreateAccommodationDto } from './dto/createAccommodation.dto';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/enum/role.enum';
import { AuthenticatedUser } from 'src/auth/decorators/authenticated-user.decorators';
import { User } from 'src/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from 'src/cloudinary/upload.service';

@Controller('accommodation')
export class AccommodationController {
    constructor (private accommodationService: AccommodationService, private uploadService: UploadService){}

    @Roles(Role.USER)
    @Post('create')
    @UseInterceptors(FileInterceptor('image'))

    async createAccommodation(@Body() dto: CreateAccommodationDto, @UploadedFile() image: Express.Multer.File, @AuthenticatedUser() user: User){ {
        const uploadImage = await this.uploadService.uploadImage(image)
        console.log(uploadImage);
        
        return this.accommodationService.createAccommodation(dto, user)
    }
}
}
