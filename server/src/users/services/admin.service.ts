import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsersService } from './users.service';
import { Role } from '../enums/roles.enum';

@Injectable()
export class AdminService implements OnModuleInit {
  constructor(private readonly usersService: UsersService) {}
  async onModuleInit() {
    const admin = await this.usersService.findOneByRole(Role.Admin);

    if (!admin) {
      this.usersService
        .create({
          email: 'test@mail.com',
          password: 'password',
          role: Role.Admin,
        })
        .then((user) => {
          console.log('Admin user created', user);
        });
    }
  }
}
