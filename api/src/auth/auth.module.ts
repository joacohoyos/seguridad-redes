import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';
import { NotificationModule } from '../notification/notification.module';
import { UserService } from '../user/user.service';
import { ProductService } from '../product/product.service';
import { NotificationService } from '../notification/notification.service';

@Module({
  imports: [
    ProductModule,
    UserModule,
    NotificationModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    ProductService,
    NotificationService,
    JwtStrategy,
  ],
})
export class AuthModule {}
