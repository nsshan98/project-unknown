import { Body, Controller, Get, Param, ParseIntPipe, Post, Query} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('user')
export class UserController {

    @Get()
    getAllUsers() {
        return 'All Users'
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id, @Query('name') name){
        return `User with ID: ${id} - Name: ${name}`;
    }


    @Post()
    createUser(@Body() CreateUserDto: CreateUserDto) {
        return {
            CreateUserDto
        }
    }
}
