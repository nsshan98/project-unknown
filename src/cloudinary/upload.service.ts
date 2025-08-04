import { Injectable } from '@nestjs/common';
import { UploadApiResponse } from 'cloudinary';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class UploadService {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: 'auto' }, (error, result) => {
          if (error) return reject(error);

          resolve(result as UploadApiResponse);
        })
        .end(file.buffer);
    });
  }
}
