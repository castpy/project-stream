import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    throw new ForbiddenException();
  }

  async getMovieById(id: string) {
    try {
      return await this.prisma.movies.findUnique({
        where: {
          id,
        },
        select: {
          image: true,
          title: true,
          category: true,
          description: true,
          customer: {
            select: {
              id: true,
              name: true,
              avatar: true,
              youtube: true,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
