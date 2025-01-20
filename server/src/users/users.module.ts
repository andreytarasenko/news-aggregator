import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from './entities/user.entity';
import { UsersService } from './services/users.service';
import { AdminService } from './services/admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [],
  providers: [AdminService, UsersService],
  exports: [TypeOrmModule],
})
export class UsersModule {}
