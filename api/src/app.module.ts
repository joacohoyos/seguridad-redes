import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { NotificationModule } from './notification/notification.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        prismaOptions: {
          log: [
            {
              level: 'query',
              emit: 'event',
            },
          ],
        },
      },
    }),
    UserModule,
    ProductModule,
    NotificationModule,
    AuthModule,
  ],
})
export class AppModule {}
