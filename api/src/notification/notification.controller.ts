import { Controller, Get, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationDTO } from './dto/notification.dto';

@Controller('notifications')
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
