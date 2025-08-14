import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Accommodation } from 'src/entities/accommodation.entity';
import { Repository } from 'typeorm';
import { CreateAccommodationDto } from './dto/createAccommodation.dto';
import { User } from 'src/entities/user.entity';
import { UpdateAccommodationDto } from './dto/updateAccommodation.dto';

@Injectable()
export class AccommodationService {
  constructor(
    @InjectRepository(Accommodation)
    private accommodationRepository: Repository<Accommodation>,
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

   if(!accommodation) throw new NotFoundException('Accommodation not found')

    const { amenity: amenityDto, ...rest} = dto as UpdateAccommodationDto
    
    
    Object.assign(accommodation, rest)

    if(amenityDto){
      if(accommodation.amenity){
        Object.assign(accommodation.amenity, amenityDto)
      }
    }
    const savedAccommodation = await this.accommodationRepository.save(accommodation)


    const response = {
      ...savedAccommodation,
      user: {
        id: accommodation.user.id,
        email: accommodation.user.email,
      }
    }

    return response
  }

//   async updateAccommodation(id: string, dto: UpdateAccommodationDto) {
//   const accommodation = await this.accommodationRepository.findOne({
//     where: { id },
//     relations: ['amenity', 'user'],
//   });

//   if (!accommodation) throw new NotFoundException('Accommodation not found');

//   // separate nested amenity so we don't accidentally overwrite relation with plain object
//   const { amenity: amenityDto, ...rest } = dto as UpdateAccommodationDto;

//   // Merge primitive fields / image etc.
//   Object.assign(accommodation, rest);

//   // If amenity DTO present -> update or create
//   if (amenityDto) {
//     if (accommodation.amenity) {
//       // update existing amenity object in-place (cascade: true will persist)
//       Object.assign(accommodation.amenity, amenityDto);
//     }
//   }

//   // save will persist both accommodation and amenity (cascade:true)
//   const savedAccommodation = await this.accommodationRepository.save(accommodation);
  
//   // return this.accommodationRepository.findOne({ where: { id }, relations: ['amenity', 'user'] });


// const response = {
//   ...savedAccommodation,
//   user: {
//     id: accommodation.user.id,
//     email: accommodation.user.email,
//     // no password, no other fields
//   }
// };

// return response;
// }

  async deleteAccommodation(id: string){
    return await this.accommodationRepository.delete({id})
  }

  async getAllAccommodations() {
    return await this.accommodationRepository.find()
  }
}
