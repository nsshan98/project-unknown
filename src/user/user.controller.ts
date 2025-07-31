import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { PaginationDto } from './dto/pagination.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth/jwt-auth.guard';
import { Role } from 'src/auth/enum/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { RolesGuard } from 'src/auth/guard/roles/roles.guard';
import { Public } from 'src/auth/decorators/public.decorators';

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

    @Roles(Role.USER)
    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id) {
        const deleteUser = this.userService.deleteUser(id);
        console.log(deleteUser);
        
        if(!deleteUser){
            return NotFoundException
        }
        return {
            message: 'User Deleted',
            deleteUser
        }
    }

}
