import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../enums/roles.enum';
import { hashPassword } from 'src/common/utils/password';
import { UserBase } from '../dto/create-user.dto';
import { User } from '../dto/user.dto';
import UserEntity from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async findOneById(id: string) {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findOneByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findOneByRole(role: Role) {
    return this.usersRepository.findOne({
      where: { role },
    });
  }

  async checkIfExists(userData: UserBase) {
    return this.usersRepository.exists({ where: { email: userData.email } });
  }

  async create(user: UserBase): Promise<Omit<User, 'password'>> {
    const userData = await this.usersRepository.save(
      new UserEntity({ ...user, password: await hashPassword(user.password) }),
    );
    return userData;
  }

  async update(user: User): Promise<Omit<User, 'password'>> {
    const userData = await this.usersRepository.save(new UserEntity(user));

    return userData;
  }

  async remove(id: string) {
    if (!this.usersRepository.exists({ where: { id } })) {
      throw new BadRequestException('User does not exist');
    }

    return this.usersRepository.delete(id);
  }
}
