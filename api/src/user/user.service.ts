import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { User } from './user.entity';
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
      return this.prisma.users.update({
        where: { id: Number(userId) },
        data: {
          ...rest,
          password,
        },
      });
    }

    if (password_to_confirm) {
      return this.prisma.users.update({
        where: { id: Number(userId) },
        data: {
          ...rest,
          password_to_confirm,
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

  async createUser(user: Partial<User>): Promise<User> {
    const { name, email, password } = user;

    const existingUser = await this.prisma.users.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new Error('Email is already taken.');
    }

    return this.prisma.users.create({
      data: {
        name,
        email,
        password,
        role: EUserRole.USER, // Set the default role to USER
        is_admin: false, // Assuming the initial admin status is set to false
      },
    });
  }
}
