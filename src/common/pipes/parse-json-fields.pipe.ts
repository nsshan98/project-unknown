import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseJsonFieldsPipe implements PipeTransform {
  constructor(private fields: string[]) {}

transform(value: any, metadata: ArgumentMetadata) {
  console.log('Pipe received value:', value);

  if (!value || typeof value !== 'object') {
    console.log('Pipe skipped parsing - not an object');
    return value;
  }

  for (const field of this.fields) {
    const fieldValue = value[field];
    console.log(`Field "${field}" before parsing:`, fieldValue, typeof fieldValue);
    
    if (fieldValue && typeof fieldValue === 'string') {
      try {
        value[field] = JSON.parse(fieldValue);
        console.log(`Field "${field}" parsed successfully:`, value[field]);
      } catch {
        throw new BadRequestException(`Field ${field} is not a valid JSON`);
      }
    }
  }

  console.log('Pipe returning value:', value);
  return value;
}
}