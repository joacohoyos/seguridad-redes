import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { User, UserWithoutPassword } from './user.entity';
import { EUserRole } from './enum/role.enum';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private removePassword(user: User): UserWithoutPassword {
    const { password, ...rest } = user;
    return rest;
  }
  async getUsers(): Promise<UserWithoutPassword[]> {
    const users = await this.prisma.users.findMany();
    return users.map(this.removePassword);
  }

  async getUsersByRole(role: EUserRole): Promise<User[]> {
    const users = await this.prisma.users.findMany({ where: { role: role } });
    return users
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.users.findUnique({ where: { email } });
    return user;
  }

  async updateUser(email: string, userData: Partial<User>): Promise<User> {
    const user = await this.prisma.users.findUnique({
      where: { email: email },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { password, password_to_confirm, ...rest } = userData;

    if (password) {
      return this.prisma.users.update({
        where: { email: email },
        data: {
          ...rest,
          password,
        },
      });
    }

    if (password_to_confirm) {
      return this.prisma.users.update({
        where: { email: email },
        data: {
          ...rest,
          password_to_confirm,
        },
      });
    }

    return this.prisma.users.update({
      where: { email: email },
      data: {
        ...rest,
      },
    });
  }
  async confirmPassword(email: string): Promise<User> {
    const user = await this.prisma.users.findUnique({
      where: { email: email },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.password_to_confirm) {
      throw new NotFoundException(
        'The user does not have a password to confirm',
      );
    }

    const updatedUser = await this.prisma.users.update({
      where: { email: email },
      data: {
        password: user.password_to_confirm,
        password_to_confirm: null,
      },
    });
    return updatedUser
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
