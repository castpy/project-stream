import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async getCustomerByEmail(email: string) {
    try {
      return await this.prisma.customers.findUniqueOrThrow({
        where: {
          email,
        },
      });
    } catch {
      throw new NotFoundException('Cliente não encontrado');
    }
  }

  async getUserStoreById(id: string) {
    try {
      return await this.prisma.customers.findUniqueOrThrow({
        where: {
          id,
        },
      });
    } catch {
      throw new NotFoundException('Cliente não encontrado');
    }
  }
}
