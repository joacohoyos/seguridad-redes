import { Controller, Get, Put, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Put(':userId')
  async updateUser(
    @Param('userId') userId: number,
    @Body() userData: Partial<User>,
  ): Promise<User> {
    return this.userService.updateUser(userId, userData);
  }
}
