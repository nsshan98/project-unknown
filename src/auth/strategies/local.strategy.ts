import { Injectable } from "@nestjs/common";
import { Strategy} from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService){
        super({
            userNameField: 'email',
        })
    }

    validate(email: string, password: string) {
        return this.authService.validateUser(email, password);
    }
}