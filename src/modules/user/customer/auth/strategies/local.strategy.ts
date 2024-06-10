import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthCustomerService } from '../auth.customer.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  'customer.local',
) {
  constructor(private readonly authCustomeService: AuthCustomerService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    try {
      const customer = await this.authCustomeService.validateUser(
        email,
        password,
      );

      if (!customer)
        throw new UnauthorizedException('Email ou senha inválidos');

      return customer;
    } catch (e) {
      throw e;
    }
  }
}
