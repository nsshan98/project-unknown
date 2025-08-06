import {
  BadRequestException,
  Body,
  Controller,
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
    @UploadedFile(new ImageUploadValidationPipe({required: true})) image: Express.Multer.File,
    @AuthenticatedUser() user: User,
  ) {
    {
      if (!image) throw new BadRequestException('Image is required');

      const uploadImage = await this.cloudinaryService.uploadImage(image);
      dto.image = {
        image_url: uploadImage.secure_url,
        image_public_id: uploadImage.public_id,
      }
      console.log(uploadImage);

      return this.accommodationService.createAccommodation(dto, user);
    }
  }

  @Roles(Role.USER)
  @Patch('update/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateAccommodation(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateAccommodationDto,
    @UploadedFile(new ImageUploadValidationPipe({required:false})) image: Express.Multer.File | undefined,
    @AuthenticatedUser() user: User,
  ) {
    const getAccommodation = await this.accommodationService.findOneWithId(id);
    console.log(getAccommodation);

    // if(getAccommodation?.image.image_public_id){
    //   return this.cloudinaryService.deleteImage(getAccommodation.image.image_public_id)
    // }

    // const uploadImage = await this.cloudinaryService.uploadImage(image as Express.Multer.File);
    //   dto.image = {
    //     image_url: uploadImage.secure_url,
    //     image_public_id: uploadImage.public_id,
    //   }
    
    
    if(getAccommodation?.user.id !== user.id) throw new UnauthorizedException('You are not allowed to update this accommodation');
    
    return await this.accommodationService.updateAccommodation(id, dto);
  }
}
