import { EUserRole } from 'src/user/enum/role.enum';
import { User } from 'src/user/user.entity';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: EUserRole;
}

export function mapCreateUserDtoToUser(dto: CreateUserDto): Partial<User> {
  return {
    name: dto.name,
    email: dto.email,
    password: dto.password,
    role: dto.role,
    is_admin: false,
  };
}
