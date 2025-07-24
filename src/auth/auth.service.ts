import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './types/auth-jwtPaylod';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async validateUser(email: string, password: string){
        const user = await this.userService.findUserByEmail(email)
        if(!user) throw new UnauthorizedException('User not found');

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        
        if(!isPasswordMatch) throw new UnauthorizedException('Invalid Credentials');

        return user;
    }

    login(userId: number){
        const payload:AuthJwtPayload = { sub: userId };
        return this.jwtService.sign(payload)
    }
}