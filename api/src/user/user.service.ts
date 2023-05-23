import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { User } from './user.entity';
import bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(): Promise<User[]> {
    return this.prisma.users.findMany();
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.prisma.users.findUnique({ where: { email } });
  }

  async updateUser(userId: number, userData: Partial<User>): Promise<User> {
    const user = await this.prisma.users.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { password, ...rest } = userData;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      return this.prisma.users.update({
        where: { id: userId },
        data: {
          ...rest,
          password: hashedPassword,
        },
      });
    }

    return this.prisma.users.update({
      where: { id: userId },
      data: {
        ...rest,
      },
    });
  }
}
