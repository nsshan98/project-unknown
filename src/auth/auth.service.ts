import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { AuthJwtPayload } from './types/auth-jwtPaylod';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService,
       @Inject(refreshJwtConfig.KEY) private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>
    ) {}

    async validateUser(email: string, password: string){
        const user = await this.userService.findUserByEmail(email)
        if(!user) throw new UnauthorizedException('User not found');

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        
        if(!isPasswordMatch) throw new UnauthorizedException('Invalid Credentials');

        return user;
    }

   async login(userId: number){
        // const payload:AuthJwtPayload = { sub: userId };
        // const accessToken = this.jwtService.sign(payload)
        // const refreshToken = this.jwtService.sign(payload, this.refreshTokenConfig);
        const { accessToken, refreshToken } = await this.generateTokens(userId);
        const hashedRefreshToken = await argon2.hash(refreshToken);
        console.log(`Generated hashed refresh token: ${hashedRefreshToken}`);
        

        return {
            userId,
            accessToken,
            refreshToken
        }
    }

    async generateTokens(userId: number){
        const payload:AuthJwtPayload = { sub: userId };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload),
            this.jwtService.signAsync(payload, this.refreshTokenConfig)
        ])

        return {
            accessToken,
            refreshToken
        };
    }

    refreshToken(userId:number){
         const payload:AuthJwtPayload = { sub: userId };
        const accessToken = this.jwtService.sign(payload)
        return {
            userId,
            accessToken
        }
    }
}