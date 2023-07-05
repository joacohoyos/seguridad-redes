import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { CreateUserDto, mapCreateUserDtoToUser } from './dto/signup.dto';
import {EUserRole} from "../user/enum/role.enum";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.getUserByEmail(email);

    if (user && password === user.password) {
      return user;
    }

    return null;
  }

  async login(user: User): Promise<{ accessToken: string, role:EUserRole, isAdmin: boolean }> {
    const payload = { email: user.email };
    const accessToken = this.jwtService.sign(payload);
    const role = user.role
    const isAdmin = user.is_admin;
    return { accessToken, role, isAdmin };
  }

  async signup(createUserDto: CreateUserDto) {
    const newUser = await this.userService.createUser(
      mapCreateUserDtoToUser(createUserDto),
    );

    // Omitting password and other sensitive fields from the response
    const { password: _, ...result } = newUser;

    return result;
  }
}
