import {Body, Controller, Get, Param, Post, Put, Request, UseGuards,} from '@nestjs/common';
import {UserService} from './user.service';
import {User} from './user.entity';
import {JwtAuthGuard} from '../auth/guards/jwt.guard';
import {RoleGuard} from '../auth/guards/role.guard';
import {LoggedRequest} from '../auth/interfaces/request.interfaces';
import {EUserRole} from './enum/role.enum';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(@Request() req: LoggedRequest): Promise<User[]> {
    if (req.user.is_admin) {
      return this.userService.getUsers();
    }
    return this.userService.getUsersByRole(EUserRole.SELLER);
  }

  @Put(':id')
  async updateUser(
    @Param('id') userId: number,
    @Body() userData: Partial<User>,
  ): Promise<User> {
    return this.userService.updateUser(userId, userData);
  }
  @Post(':id/password')
  async confirmPassword(@Param('id') userId: number): Promise<User> {
    return this.userService.confirmPassword(userId);
  }
}
