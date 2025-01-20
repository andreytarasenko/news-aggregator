import { RegisterDto } from './register.dto';

export interface LoginDto extends RegisterDto {
  id: string;
}
