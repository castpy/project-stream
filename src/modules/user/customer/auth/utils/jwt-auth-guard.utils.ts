import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { CustomerService } from '../../customer.service';
import { Customers, Roles } from '@prisma/client';

@Injectable()
export class CustomerAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly customerService: CustomerService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization?.replace('Bearer ', '');

    if (!token) throw new UnauthorizedException('Não autorizado');

    const { id } = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET_KEY,
    });

    let customer: Customers;

    try {
      customer = await this.customerService.getUserStoreById(id);
      request.user = customer;
    } catch (error) {
      throw new UnauthorizedException('Não autorizado');
    }

    if (!roles) {
      // Se não há permissões para a rota, então só retorna direto
      return true;
    }

    if (!customer || !customer.role.includes(Roles.CUSTOMER)) {
      // Usuário não encontrado ou permissões não atendidas retorna um 'Não autorizado!'
      throw new UnauthorizedException('Não autorizado');
    }

    return true;
  }
}
