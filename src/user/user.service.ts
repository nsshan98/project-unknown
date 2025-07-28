import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from 'src/entities/user.entity';
import { PaginationDto } from './dto/pagination.dto';
import { DEFAULT_PAGINATION_LIMIT } from 'src/utils/constants';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userReporsitory: Repository<User>){}

    async createUser(dto: CreateUserDto){
    const user = await this.userReporsitory.create(dto);
      return await this.userReporsitory.save(user);
    }

    async getSingleUser(id: number){
        const userInfo =  await this.userReporsitory.findOne({
            where: {
                id
            },
            select: ['id', 'hashed_refresh_token']
            
        })
        if(!userInfo){
            throw new NotFoundException()
        }
        return userInfo;
    }

    async getAllUsers(paginationDto: PaginationDto) {
        console.log(paginationDto);
        return await this.userReporsitory.find({
            skip: paginationDto.skip,
            take: paginationDto.limit ?? DEFAULT_PAGINATION_LIMIT
        });
    }

    async updateUser(id:number, dto:UpdateUserDto){
        return await this.userReporsitory.update({id}, dto)
        
    }

    async deleteUser(id: number){
        return await this.userReporsitory.delete({id});
    }

    async findUserByEmail(email: string){
        return await this.userReporsitory.findOne({
            where: {
                email
            }
        })
    }

    async updateHashedRefreshToken(userId: number, hashedRefreshToken: string | null) {
        console.log(`Updating hashed refresh token for user ${userId} to ${hashedRefreshToken}`);
        
        return await this.userReporsitory.update(
            { id: userId },
            { hashed_refresh_token: hashedRefreshToken }
        );
    }
    
}
