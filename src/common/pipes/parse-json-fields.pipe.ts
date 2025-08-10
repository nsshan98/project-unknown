import { Injectable, PipeTransform, BadRequestException, ValidationPipe, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ParseThenValidatePipe implements PipeTransform {
  private validator = new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  });

  constructor(private fieldsToParse: string[] = []) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    if (value && typeof value === 'object') {
      for (const field of this.fieldsToParse) {
        if (typeof value[field] === 'string') {
          try {
            value[field] = JSON.parse(value[field]);
          } catch {
            throw new BadRequestException(`Field ${field} contains invalid JSON`);
          }
        }
      }
    }
    return this.validator.transform(value, metadata);
  }
}
