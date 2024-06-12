import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export default async function seed() {
  try {
    await prisma.highlights.createMany({
      data: [
        {
          id: uuidv4(),
          movieId: 'a4ddb5f1-d3b0-4885-944d-c7f98b9ea2c2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          movieId: '8684afd6-788a-4ee8-bcd7-730413646309',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          movieId: 'b6b48670-0e5a-4693-bc52-1ecaac1a58dc',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    });

    console.log('Seed de HIGHLIGHTS criada com sucesso!');
  } catch (error) {
    console.log('Erro ao criar Seed de HIGHLIGHTS:', error);
  } finally {
    await prisma.$disconnect();
  }
}
