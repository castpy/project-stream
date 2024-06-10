import { PrismaClient, Roles } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export default async function seed() {
  try {
    await prisma.customers.upsert({
      where: { id: uuidv4() },
      update: {},
      create: {
        id: uuidv4(),
        role: [Roles.CUSTOMER],
        name: 'Customer Seed',
        email: 'customer@email.com',
        password: hashSync('Teste@123', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    console.log('Seed de CUSTOMER criada com sucesso!');
  } catch (error) {
    console.log('Erro ao criar Seed de CUSTOMER:', error);
  } finally {
    await prisma.$disconnect();
  }
}
