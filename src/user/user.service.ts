import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userReporsitory: Repository<User>){}

    async createUser(dto: CreateUserDto){
      return await this.userReporsitory.save(dto);
    }

    async getSingleUser(id: number){
        const userInfo =  await this.userReporsitory.findOne({
            where: {
                id
            }
        })
        if(!userInfo){
            throw new NotFoundException()
        }
        return userInfo;
    }

    async getAllUsers() {
        return await this.userReporsitory.find();
    }

    async updateUser(id:number, dto:UpdateUserDto){
        return await this.userReporsitory.update({id}, dto)
        
    }

    async deleteUser(id: number){
        return await this.userReporsitory.delete({id});
    }
}
