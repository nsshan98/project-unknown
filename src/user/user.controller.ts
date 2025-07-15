import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    createUser(@Body() dto: CreateUserDto) {
        return this.userService.createUser(dto);
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id, @Query('name') name){
        return this.userService.getSingleUser(id);
    }

    @Get()
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id, @Body() dto: UpdateUserDto) {
        return this.userService.updateUser(id, dto);
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id) {
        return this.userService.deleteUser(id);
    }

}
