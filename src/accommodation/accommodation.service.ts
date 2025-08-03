import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Accommodation } from 'src/entities/accommodation.entity';
import { Repository } from 'typeorm';
import { CreateAccommodationDto } from './dto/createAccommodation.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AccommodationService {
    constructor(@InjectRepository(Accommodation) private accommodationRepository: Repository<Accommodation>,) {}

    async createAccommodation(dto: CreateAccommodationDto, user: User) {
        const accommodation = await this.accommodationRepository.create({
            ...dto,
            user,});
        return await this.accommodationRepository.save(accommodation);
    }
}
