import {Body, Controller, Get, Param, Post, Put, Request, UseGuards,} from '@nestjs/common';
import {UserService} from './user.service';
import {User} from './user.entity';
import {JwtAuthGuard} from '../auth/guards/jwt.guard';
import {LoggedRequest} from '../auth/interfaces/request.interfaces';
import {EUserRole} from './enum/role.enum';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUsers(@Request() req: LoggedRequest): Promise<User[]> {
    if (req.user.is_admin) {
      return this.userService.getUsers();
    }
    return this.userService.getUsersByRole(EUserRole.SELLER);
  }

  @Put(':email')
  async updateUser(
    @Param('email') email: string,
    @Body() userData: Partial<User>,
  ): Promise<User> {
    return this.userService.updateUser(email, userData);
  }
  
  @Post(':email/password')
  async confirmPassword(@Param('email') email: string): Promise<User> {
    return this.userService.confirmPassword(email);
  }
}
