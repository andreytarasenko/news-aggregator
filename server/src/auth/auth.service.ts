import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { comparePasswords } from 'src/common/utils/password';
import { UsersService } from 'src/users/services/users.service';
import { UserDto } from 'src/users/dto/user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly JwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  register(userBase: CreateUserDto) {
    return this.usersService.create(userBase);
  }

  async login(user: UserDto) {
    const userData = await this.usersService.findOneById(user.id);

    if (!userData) {
      throw new BadRequestException('User does not exist');
    }

    const isPasswordValid = comparePasswords(user.password, userData.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    const accessToken = await this.generateAccessToken(userData);
    const refreshToken = await this.generateRefreshToken(userData);

    await this.usersService.update({ ...userData, refreshToken });

    return { accessToken, refreshToken };
  }

  async logout(user: UserDto) {
    const userData = await this.usersService.findOneById(user.id);

    if (!userData) {
      throw new BadRequestException('User does not exist');
    }

    return this.usersService.update({ ...userData, refreshToken: null });
  }

  async refresh(userId: string, refreshToken: string) {
    const userData = await this.usersService.findOneById(userId);

    const isTokenValid = userData.refreshToken === refreshToken;

    if (!isTokenValid) {
      throw new BadRequestException('Invalid refresh token');
    }

    return {
      accessToken: await this.generateAccessToken(userData),
      refreshToken: await this.generateRefreshToken(userData),
    };
  }

  //######

  private async generateAccessToken(user: UserDto) {
    return this.JwtService.signAsync(
      { sub: user.id, email: user.email },
      { secret: process.env.JWT_SECRET },
    );
  }

  private async generateRefreshToken(user: UserDto) {
    return this.JwtService.signAsync(
      { sub: user.id, email: user.email },
      { secret: process.env.JWT_REFRESH_SECRET },
    );
  }
}
