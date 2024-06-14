import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from './prisma.service';
import groupByCategoryMovie from './utils/groupeByCategoryMovie.utils';

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

  async getHighlights() {
    try {
      return await this.prisma.highlights.findMany({
        select: {
          movieId: true,
          movie: {
            select: {
              title: true,
              image: true,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getMovies() {
    try {
      const response = await this.prisma.movies.findMany({
        select: {
          id: true,
          image: true,
          title: true,
          category: true,
          customer: {
            select: {
              name: true,
            },
          },
        },
      });

      return await groupByCategoryMovie(response);
    } catch (error) {
      throw error;
    }
  }

  async getMovieEmbed(id: string) {
    try {
      return await this.prisma.movies.findUnique({
        where: {
          id,
        },
        select: {
          embed: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getCustomerDetails(id: string) {
    try {
      try {
        const customer = await this.prisma.customers.findUniqueOrThrow({
          where: {
            id,
          },
          select: {
            name: true,
            avatar: true,
            youtube: true,
            twitter: true,
            facebook: true,
            instagram: true,
          },
        });

        const customerMovies = await this.prisma.movies.findMany({
          where: {
            customerId: id,
          },
          select: {
            id: true,
            image: true,
            title: true,
            category: true,
            customer: {
              select: {
                name: true,
              },
            },
          },
        });

        const movies = await groupByCategoryMovie(customerMovies);

        return {
          customer,
          movies,
        };
      } catch {
        throw new NotFoundException('Customer not found');
      }
    } catch (error) {
      throw error;
    }
  }
}
