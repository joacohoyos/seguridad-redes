import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcryptjs';
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

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    return null;
  }

  async login(user: User): Promise<{ accessToken: string, role:EUserRole }> {
    const payload = { email: user.email };
    const accessToken = this.jwtService.sign(payload);
    const role = user.role
    return { accessToken, role };
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
