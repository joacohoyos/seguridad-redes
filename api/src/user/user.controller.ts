import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserWithoutPassword } from './user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { LoggedRequest } from '../auth/interfaces/request.interfaces';
import { EUserRole } from './enum/role.enum';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUsers(@Request() req: LoggedRequest): Promise<UserWithoutPassword[]> {
    if (req.user.is_admin) {
      return this.userService.getUsers();
    }
    const users = await this.userService.getUsersByRole(EUserRole.SELLER);
    return users.map((user) => {
      delete user.password;
      return user;
    });
  }

  @Put(':email')
  async updateUser(
    @Param('email') email: string,
    @Body() userData: Partial<User>,
  ): Promise<UserWithoutPassword> {
    const user = await this.userService.updateUser(email, userData);
    delete user.password;
    return user;
  }

  @Post(':email/password')
  async confirmPassword(
    @Param('email') email: string,
  ): Promise<UserWithoutPassword> {
    const user = await this.userService.confirmPassword(email);
    delete user.password;
    return user;
  }
}
