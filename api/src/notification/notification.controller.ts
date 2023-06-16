import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationDTO } from './dto/notification.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  getCurrentNotification() {
    return this.notificationService.getCurrentNotification();
  }

  @Post()
  createProduct(@Body() notification: NotificationDTO) {
    return this.notificationService.createNotification(notification.text);
  }
}
