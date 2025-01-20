import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/services/users.service';
import { UsersModule } from 'src/users/users.module';
import { AccessJwtAuthStrategy } from './strategies/access-jwt-auth.strategy';
import { RefreshJwtAuthStrategy } from './strategies/refresh-jwt-auth.strategy';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [
    UsersService,
    AuthService,
    AccessJwtAuthStrategy,
    RefreshJwtAuthStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
