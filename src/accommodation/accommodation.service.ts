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

  // async updateAccommodation(id: string, dto: UpdateAccommodationDto) {
  //   await this.accommodationRepository.update({ id }, dto);
  //   return this.accommodationRepository.findOne({
  //     where: { id },
  //   });
  // }


async updateAccommodation(id: string, dto: UpdateAccommodationDto) {
  const accommodation = await this.accommodationRepository.findOne({
    where: { id },
    relations: ['amenity'],
  });
  if (!accommodation) throw new NotFoundException('Accommodation not found');

  // Update accommodation fields except amenity
  Object.assign(accommodation, dto);

  if (dto.amenity) {
    if (accommodation.amenity) {
      // Update existing amenity fields
      Object.assign(accommodation.amenity, dto.amenity);
      await this.amenityRepository.save(accommodation.amenity);
    } else {
      // Create new amenity, set relation explicitly
      const newAmenity = this.amenityRepository.create(dto.amenity);
      newAmenity.accommodation = accommodation;
      await this.amenityRepository.save(newAmenity);
      accommodation.amenity = newAmenity;
    }
  }

  return this.accommodationRepository.save(accommodation);
}

  

  async deleteAccommodation(id: string){
    return await this.accommodationRepository.delete({id})
  }

  async getAllAccommodations() {
    return await this.accommodationRepository.find()
  }
}
