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
        avatar: 'https://avatars.githubusercontent.com/u/5789924?v=4',
        name: 'Customer Seed',
        email: 'customer@email.com',
        password: hashSync('Teste@123', 10),
        youtube: 'https://www.youtube.com/channel/UCJm7i4g4z7ZGcJA_HKHLCVw',
        twitter: 'https://twitter.com/seed',
        facebook: 'https://www.facebook.com/seed',
        instagram: 'https://www.instagram.com/seed',
        Movies: {
          createMany: {
            data: [
              {
                id: 'a4ddb5f1-d3b0-4885-944d-c7f98b9ea2c2',
                image: 'https://i3.ytimg.com/vi/xlqhdaLhRVY/maxresdefault.jpg',
                title: 'Dynamo - O mágico',
                description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                category: ['Magic', 'Realismo', 'Terror', 'Comédia'],
                embed:
                  '<iframe width="560" height="315" src="https://www.youtube.com/embed/xlqhdaLhRVY?si=bZdmUp3_6bQcVI2o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                id: '8684afd6-788a-4ee8-bcd7-730413646309',
                image: 'https://i3.ytimg.com/vi/cG9ZOLVw56Q/maxresdefault.jpg',
                title: 'A volta de quem não foi - 1',
                description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                category: ['Comédia', 'Realismo'],
                embed:
                  '<iframe width="560" height="315" src="https://www.youtube.com/embed/cG9ZOLVw56Q?si=ltr6pI35Q0YgHTcB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                id: 'b6b48670-0e5a-4693-bc52-1ecaac1a58dc',
                image: 'https://i3.ytimg.com/vi/HJ2nNvCRzW0/maxresdefault.jpg',
                title: 'The Path',
                description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                category: ['Realismo', 'Terror'],
                embed:
                  '<iframe width="560" height="315" src="https://www.youtube.com/embed/xlqhdaLhRVY?si=bZdmUp3_6bQcVI2o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ],
          },
        },
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
