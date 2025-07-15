import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private userReporsitory: Repository<UserEntity>){}

    async createUser(dto: CreateUserDto){
      return await this.userReporsitory.save(dto);
    }
}
