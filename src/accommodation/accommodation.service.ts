import { Injectable } from '@nestjs/common';
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
      user,
    });
    return await this.accommodationRepository.save(accommodation);
  }

  async updateAccommodation(id: string, dto: UpdateAccommodationDto) {
    await this.accommodationRepository.update({ id }, dto);
    return this.accommodationRepository.findOne({
      where: { id },
    });
  }

  async deleteAccommodation(id: string){
    return await this.accommodationRepository.delete({id})
  }
}
