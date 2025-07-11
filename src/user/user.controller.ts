import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('user')
export class UserController {

    @Get()
    getAllUsers() {
        return 'All Users'
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id, @Query('name') name){
        console.log(typeof id)
        console.log(typeof name)
        return `User with ID: ${id}`;
    }

    @UsePipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted:true}))
    @Post()
    createUser(@Body() CreateUserDto: CreateUserDto) {
        return {
            CreateUserDto
        }
    }
}
