import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { comparePasswords } from 'src/common/utils/password';
import { User, UserBase } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly JwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  register(userBase: UserBase) {
    return this.usersService.create(userBase);
  }

  async login(user: User) {
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

  async logout(user: User) {
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

  private async generateAccessToken(user: User) {
    return this.JwtService.signAsync(
      { sub: user.id, email: user.email },
      { secret: process.env.JWT_SECRET },
    );
  }

  private async generateRefreshToken(user: User) {
    return this.JwtService.signAsync(
      { sub: user.id, email: user.email },
      { secret: process.env.JWT_REFRESH_SECRET },
    );
  }
}
