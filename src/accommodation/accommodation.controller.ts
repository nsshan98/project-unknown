import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AccommodationService } from './accommodation.service';
import { CreateAccommodationDto } from './dto/createAccommodation.dto';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/enum/role.enum';
import { AuthenticatedUser } from 'src/auth/decorators/authenticated-user.decorators';
import { User } from 'src/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ImageUploadValidationPipe } from 'src/cloudinary/pipes/image-validation.pipe';
import { UpdateAccommodationDto } from './dto/updateAccommodation.dto';

@Controller('accommodation')
export class AccommodationController {
  constructor(
    private accommodationService: AccommodationService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Roles(Role.USER)
  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  async createAccommodation(
    @Body() dto: CreateAccommodationDto,
    @UploadedFile(new ImageUploadValidationPipe({ required: true }))
    image: Express.Multer.File,
    @AuthenticatedUser() user: User,
  ) {
    {
      if (!image) throw new BadRequestException('Image is required');

      const uploadResult = await this.cloudinaryService.uploadImage(image);
      dto.image = {
        image_url: uploadResult?.secure_url as string,
        image_public_id: uploadResult?.public_id as string,
      };

      return this.accommodationService.createAccommodation(dto, user);
    }
  }

  @Roles(Role.USER)
  @Patch('update/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateAccommodation(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateAccommodationDto,
    @UploadedFile(new ImageUploadValidationPipe({ required: false }))
    updatedImage: Express.Multer.File | undefined,
    @AuthenticatedUser() user: User,
  ) {
    const getAccommodation = await this.accommodationService.findOneWithId(id);

    if (getAccommodation?.image.image_public_id) {
      await this.cloudinaryService.deleteImage(
        getAccommodation.image.image_public_id,
      );
    }

    if (updatedImage) {
      const uploadResult = await this.cloudinaryService.uploadImage(
        updatedImage as Express.Multer.File,
      );
      dto.image = {
        image_url: uploadResult?.secure_url as string,
        image_public_id: uploadResult?.public_id as string,
      };
    }

    if (getAccommodation?.user.id !== user.id)
      throw new ForbiddenException(
        'You are not allowed to update this accommodation',
      );

    const updatedData = await this.accommodationService.updateAccommodation(
      id,
      dto,
    );

    return {
      message: 'Accommodation Updated Successfully',
      data: updatedData,
    };
  }

  @Roles(Role.USER)
  @Delete('delete/:id')
  async deleteAccommodation(@Param('id', new ParseUUIDPipe()) id: string, @AuthenticatedUser() user: User) {
    const getAccommodation = await this.accommodationService.findOneWithId(id); 
    if(user.id !== getAccommodation?.user.id){
      throw new ForbiddenException(
        'You are not allowed to update this accommodation',
      );
    }
    if(getAccommodation?.image){
      await this.cloudinaryService.deleteImage(getAccommodation.image.image_public_id);
    }
    await this.accommodationService.deleteAccommodation(id);
    return { message: 'Accommodation Deleted Successfully' };
  }

  @Roles(Role.USER)
  @Get('all-accommodations')
  async getAllAccommodations(){
   const allAccommodations = await this.accommodationService.getAllAccommodations()
   return {
    message: 'All Accommodations Fetched Successfully',
    data: allAccommodations
   }

  }
}
