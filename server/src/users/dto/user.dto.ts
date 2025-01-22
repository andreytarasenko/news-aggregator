import { Role } from '../enums/roles.enum';
import { UserBase } from './create-user.dto';

export interface User extends UserBase {
  id: string;
  firstName?: string;
  lastName?: string;
  createdAt?: Date;
  updatedAt?: Date;
  refreshToken?: string;
}

export class UserDto implements User {
  id: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  createdAt?: Date;
  updatedAt?: Date;
  refreshToken?: string;
  role?: Role;
}
