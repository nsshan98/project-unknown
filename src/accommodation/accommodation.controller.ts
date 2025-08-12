import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
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
import { ParseThenValidatePipe } from 'src/common/pipes/parse-json-fields.pipe';
// import { ParseJsonFieldsPipe } from 'src/common/pipes/parse-json-fields.pipe';

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
    console.log(typeof dto.amenity, 'dto');
    
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

  // @Roles(Role.USER)
  // @Patch('update/:id')
  // @UseInterceptors(FileInterceptor('image'))
  // async updateAccommodation(
  //   @Param('id', new ParseUUIDPipe()) id: string,
  //   @Body() dto: UpdateAccommodationDto,
  //   @UploadedFile(new ImageUploadValidationPipe({ required: false }))
  //   updatedImage: Express.Multer.File | undefined,
  //   @AuthenticatedUser() user: User,
  // ) {
  //   const getAccommodation = await this.accommodationService.findOneWithId(id);
  //   console.log(getAccommodation);
    

  //   if (getAccommodation?.image.image_public_id) {
  //     await this.cloudinaryService.deleteImage(
  //       getAccommodation.image.image_public_id,
  //     );
  //   }

  //   if (updatedImage) {
  //     const uploadResult = await this.cloudinaryService.uploadImage(
  //       updatedImage as Express.Multer.File,
  //     );
  //     dto.image = {
  //       image_url: uploadResult?.secure_url as string,
  //       image_public_id: uploadResult?.public_id as string,
  //     };
  //   }

  //   if (getAccommodation?.user.id !== user.id)
  //     throw new ForbiddenException(
  //       'You are not allowed to update this accommodation',
  //     );

  //   const updatedData = await this.accommodationService.updateAccommodation(
  //     id,
  //     dto,
  //   );

  //   return {
  //     message: 'Accommodation Updated Successfully',
  //     data: updatedData,
  //   };
  // }

   // accommodation.controller.ts
@Roles(Role.USER)
@Patch('update/:id')
@UseInterceptors(FileInterceptor('image'))
async updateAccommodation(
  @Param('id', new ParseUUIDPipe()) id: string,
  @Body(new ParseThenValidatePipe(['amenity'])) dto: UpdateAccommodationDto,
  @UploadedFile(new ImageUploadValidationPipe({ required: false }))
  updatedImage: Express.Multer.File,
  @AuthenticatedUser() user: User,
) {
  // 1) load existing entity (with relations)
  const existing = await this.accommodationService.findOneWithId(id); // should include user and amenity
  if (!existing) throw new NotFoundException('Accommodation not found');

  // 2) ownership check BEFORE any upload/deletes
  if (existing.user.id !== user.id)
    throw new ForbiddenException('You are not allowed to update this accommodation');

  // 3) if new file present -> upload it and set dto.image
  try {
    if (updatedImage) {
     const newUploadResult = await this.cloudinaryService.uploadImage(updatedImage as Express.Multer.File);
      dto.image = {
        image_url: newUploadResult?.secure_url as string,
        image_public_id: newUploadResult?.public_id as string,
      };
    }

    // 4) call service to update (this will handle amenity merging)
    const updated = await this.accommodationService.updateAccommodation(id, dto);

    // 5) now that DB is consistent, delete old image from Cloudinary (if replaced)
    if (updatedImage && existing.image?.image_public_id) {
      // non-blocking delete: log if fails but don't rollback the whole request
      await this.cloudinaryService
        .deleteImage(existing.image.image_public_id)
        .catch((err) => console.warn('Failed to delete old image:', err?.message ?? err));
    }

    return {
      message: 'Accommodation Updated Successfully',
      data: updated,
    };
  } catch (err) {
    // 6) cleanup: remove new image if we uploaded and DB failed
   
    throw err; // let Nest handle status
  }
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
