import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigType } from "@nestjs/config";
import { AuthJwtPayload } from "../types/auth-jwtPaylod";
import { Inject, Injectable } from "@nestjs/common";
import refreshJwtConfig from "../config/refresh-jwt.config";

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
    constructor(@Inject(refreshJwtConfig.KEY) private refrshJwtConfiguration: ConfigType<typeof refreshJwtConfig>) {
        if (!refrshJwtConfiguration.secret) {
            throw new Error("JWT secret is not defined in configuration.");
        }
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: refrshJwtConfiguration.secret,
        })
    }

    validate(payload:AuthJwtPayload){
        return { userId: payload.sub };
    }
}