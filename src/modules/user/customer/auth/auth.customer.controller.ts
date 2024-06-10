import {
  Controller,
  Post,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiBody,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Customers } from '@prisma/client';
import { GetCustomerAuth } from './decorators/get.customer.decorator';
import { AuthCustomerBodyDto } from './dtos/auth.customer-body.dtos';
import { AuthCustomerService } from './auth.customer.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('customer')
@ApiTags('Rotas do usuário: Customer')
export class AuthCustomerController {
  constructor(private readonly authCustomer: AuthCustomerService) {}

  @Post('/auth')
  @ApiOkResponse({ type: String })
  @UseGuards(AuthGuard('customer.local'))
  @ApiBody({ type: AuthCustomerBodyDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedException })
  async login(@GetCustomerAuth() Customer: Customers) {
    return this.authCustomer.login(Customer);
  }
}
