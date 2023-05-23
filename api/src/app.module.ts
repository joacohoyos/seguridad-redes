import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { MenuModule } from './menu/menu.module';
import { UserModule } from './user/user.module';

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
    MenuModule,
    UserModule,
  ],
})
export class AppModule {}
