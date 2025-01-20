import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User, UserBase } from 'src/users/entities/user.entity';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { AccessTokenGuard } from './guards/access-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() userBase: UserBase) {
    return this.authService.register(userBase);
  }

  @Post('login')
  login(@Body() user: User) {
    return this.authService.login(user);
  }

  @UseGuards(AccessTokenGuard)
  @Post('logout')
  logout(@Body() user: User) {
    return this.authService.logout(user);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  refresh(@Body() data: { userId: string; refreshToken: string }) {
    return this.authService.refresh(data.userId, data.refreshToken);
  }

  // @Post('forgot-password')
  // forgotPassword() {
  //   return this.authService.forgotPassword();
  // }
}
