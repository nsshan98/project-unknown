import { Controller, Get, Param, Post } from '@nestjs/common';

@Controller('user')
export class UserController {

    @Get()
    getAllUsers() {
        return 'All Users'
    }

    @Get(':id')
    getUserById(@Param('id') id: string){
        return `User with ID: ${id}`;
    }

    @Post()
    createUser() {
        return 'User Created';
    }
}
