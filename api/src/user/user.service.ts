import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { EUserRole } from './enum/role.enum';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(): Promise<User[]> {
    return this.prisma.users.findMany();
  }

  async getUsersByRole(role: EUserRole): Promise<User[]> {
    return this.prisma.users.findMany({ where: { role: role } });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.prisma.users.findUnique({ where: { email } });
  }

  async updateUser(userId: number, userData: Partial<User>): Promise<User> {
    const user = await this.prisma.users.findUnique({
      where: { id: Number(userId) },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { password, password_to_confirm, ...rest } = userData;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      return this.prisma.users.update({
        where: { id: Number(userId) },
        data: {
          ...rest,
          password: hashedPassword,
        },
      });
    }

    if (password_to_confirm) {
      const hashedPassword = await bcrypt.hash(password_to_confirm, 10);
      return this.prisma.users.update({
        where: { id: Number(userId) },
        data: {
          ...rest,
          password_to_confirm: hashedPassword,
        },
      });
    }

    return this.prisma.users.update({
      where: { id: Number(userId) },
      data: {
        ...rest,
      },
    });
  }
  async confirmPassword(userId: number): Promise<User> {
    const user = await this.prisma.users.findUnique({
      where: { id: Number(userId) },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.password_to_confirm) {
      throw new NotFoundException(
        'The user does not have a password to confirm',
      );
    }

    return this.prisma.users.update({
      where: { id: Number(userId) },
      data: {
        password: user.password_to_confirm,
        password_to_confirm: null,
      },
    });
  }
}
