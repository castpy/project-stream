import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { UserRole } from './auth/decorators/roles.decorator';
import { Customers, Roles } from '@prisma/client';
import { CustomerAuthGuard } from './auth/utils/jwt-auth-guard.utils';
import { GetCustomerAuth } from './auth/decorators/get.customer.decorator';

@Controller('customer')
@ApiTags('Rotas do usuário: Customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('me')
  @ApiBearerAuth()
  @ApiSecurity('bearer')
  @UserRole(Roles.CUSTOMER)
  @UseGuards(CustomerAuthGuard)
  async getMe(@GetCustomerAuth() customer: Customers) {
    return await this.customerService.getMe(customer.id);
  }
}
