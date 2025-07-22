import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async validateUser(email: string, password: string){
        const user = await this.userService.findUserByEmail(email)
        if(!user) throw new UnauthorizedException('User not found');

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch) throw new UnauthorizedException('Invalid password');

        return user;
    }
}
