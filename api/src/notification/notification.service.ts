import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Notification } from './notification.entity';
@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async getCurrentNotification(): Promise<Notification> {
    return this.prisma.notifications.findFirst({
      where: { expiration: null },
    });
  }

  async createNotification(text: string) {
    this.prisma.notifications.updateMany({
      where: { expiration: null },
      data: { expiration: new Date() },
    });

    return this.prisma.notifications.create({
      data: {
        text: text,
      },
    });
  }
}
