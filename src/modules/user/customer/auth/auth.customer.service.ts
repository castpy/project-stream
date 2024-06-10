import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { CustomerService } from '../customer.service';
import { Customers } from '@prisma/client';
import { AuthCustomerPayloadDto } from './dtos/auth.customer-payload.dto';

@Injectable()
export class AuthCustomerService {
  constructor(
    private readonly customerService: CustomerService,
    private readonly jwtService: JwtService,
  ) {}

  async login(customer: Customers) {
    const payload: AuthCustomerPayloadDto = {
      id: customer.id,
    };

    const token = this.jwtService.sign(payload);

    return {
      token,
    };
  }

  async validateUser(email: string, password: string) {
    let customer: Customers;
    try {
      customer = await this.customerService.getCustomerByEmail(email);
    } catch (error) {
      return null;
    }

    const isPasswordValid = compareSync(password, customer.password);

    if (!isPasswordValid) return null;

    return customer;
  }
}
