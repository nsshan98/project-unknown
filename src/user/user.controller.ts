import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { PaginationDto } from './dto/pagination.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth/jwt-auth.guard';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    createUser(@Body() dto: CreateUserDto) {
        
        return this.userService.createUser(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getUserById(@Req() req){
        return this.userService.getSingleUser(req.user.userId);
    }

    @Get()
    getAllUsers(@Query() paginationDto: PaginationDto) {
        console.log(paginationDto);
        return this.userService.getAllUsers(paginationDto);
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
