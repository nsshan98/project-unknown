import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class ImageUploadValidationPipe implements PipeTransform {
  transform(file: Express.Multer.File) {
    console.log(file);
    
    if (!file) {
      throw new BadRequestException('File is required');
    }

    // if(file.length)

    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException('Unsupported file type');
    }

    const maxFileSize = 2 * 1024 * 1024;
    if (file.size > maxFileSize) {
      throw new BadRequestException('File size is too large');
    }

    return file;
  }
}
