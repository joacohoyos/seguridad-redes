import { EUserRole } from './enum/role.enum';

export class User {
  id: number;
  name: string;
  email: string;
  role: EUserRole;
  password: string;
  is_admin: boolean;
  password_to_confirm?: string;
}

export type UserWithoutPassword = Omit<User, 'password'>;
