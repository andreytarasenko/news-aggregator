import { Role } from '../enums/roles.enum';

export interface UserBase {
  email: string;
  password: string;
  role?: Role;
}

export class CreateUserDto implements UserBase {
  email: string;
  password: string;
  role?: Role;
}
