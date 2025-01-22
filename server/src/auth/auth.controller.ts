import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { AccessTokenGuard } from './guards/access-token.guard';
import { Roles } from 'src/common/decorators/roles';
import { Public } from 'src/common/decorators/access';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserDto } from 'src/users/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() userBase: CreateUserDto) {
    return this.authService.register(userBase);
  }

  @Public()
  @Roles()
  @Post('login')
  login(@Body() user: UserDto) {
    return this.authService.login(user);
  }

  @UseGuards(AccessTokenGuard)
  @Post('logout')
  logout(@Body() user: UserDto) {
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
