import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Accommodation } from 'src/entities/accommodation.entity';
import { Repository } from 'typeorm';
import { CreateAccommodationDto } from './dto/createAccommodation.dto';
import { User } from 'src/entities/user.entity';
import { UpdateAccommodationDto } from './dto/updateAccommodation.dto';
import { Amenity } from 'src/entities/amenity.entity';

@Injectable()
export class AccommodationService {
  constructor(
    @InjectRepository(Accommodation)
    private accommodationRepository: Repository<Accommodation>,

    @InjectRepository(Amenity)
    private amenityRepository: Repository<Amenity>,
  ) {}

  async findOneWithId(id: string) {
    return await this.accommodationRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }
  async createAccommodation(dto: CreateAccommodationDto, user: User) {
    
    const accommodation = await this.accommodationRepository.create({
      ...dto,
      amenity: dto.amenity,
      user,
    });
    
    return await this.accommodationRepository.save(accommodation);
  }

async updateAccommodation(id: string, dto: UpdateAccommodationDto) {
  const accommodation = await this.accommodationRepository.findOne({
    where: { id },
    relations: ['amenity', 'user'],
  });

  if (!accommodation) throw new NotFoundException('Accommodation not found');

  // separate nested amenity so we don't accidentally overwrite relation with plain object
  const { amenity: amenityDto, ...rest } = dto as any;

  // Merge primitive fields / image etc.
  Object.assign(accommodation, rest);

  // If amenity DTO present -> update or create
  if (amenityDto) {
    if (accommodation.amenity) {
      // update existing amenity object in-place (cascade: true will persist)
      Object.assign(accommodation.amenity, amenityDto);
    }
  }

  // save will persist both accommodation and amenity (cascade:true)
  const saved = await this.accommodationRepository.save(accommodation);
  return this.accommodationRepository.findOne({ where: { id }, relations: ['amenity', 'user'] });
}

  async deleteAccommodation(id: string){
    return await this.accommodationRepository.delete({id})
  }

  async getAllAccommodations() {
    return await this.accommodationRepository.find()
  }
}
