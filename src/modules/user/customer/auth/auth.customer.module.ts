import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { CustomerModule } from '../customer.module';
import { CustomerService } from '../customer.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthCustomerController } from './auth.customer.controller';
import { AuthCustomerService } from './auth.customer.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CustomerModule,
    PassportModule,
    JwtModule.register({
      privateKey: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  controllers: [AuthCustomerController],
  providers: [
    AuthCustomerService,
    LocalStrategy,
    JwtStrategy,
    PrismaService,
    CustomerService,
  ],
})
export class AuthCustomerModule {}
