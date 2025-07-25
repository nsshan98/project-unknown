import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth/local-auth.guard';
import { RefreshJwtAuthGuard } from './guard/refresh-jwt-auth/refresh-jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req){
    return this.authService.login(req.user.id);

  }

  @UseGuards(RefreshJwtAuthGuard)
  @Post("refresh-token")
  refreshToken(@Request() req){
    const userId = req.user.id;
    return this.authService.refreshToken(userId);
  }
}
