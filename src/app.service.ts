import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { List, Movies } from './types/get.movies.service';

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

      const groupedMovies: { [key: string]: List[] } = {};

      response.forEach((movie) => {
        if (Array.isArray(movie.category)) {
          movie.category.forEach((cat) => {
            if (!groupedMovies[cat]) {
              groupedMovies[cat] = [];
            }
            groupedMovies[cat].push({
              id: movie.id,
              image: movie.image,
              title: movie.title,
              customer: movie.customer,
            });
          });
        } else {
          const category = movie.category;
          if (!groupedMovies[category]) {
            groupedMovies[category] = [];
          }
          groupedMovies[category].push({
            id: movie.id,
            image: movie.image,
            title: movie.title,
            customer: movie.customer,
          });
        }
      });

      // Filtra categorias com mais de um filme
      const filteredGroupedMovies = Object.keys(groupedMovies).reduce(
        (acc, category) => {
          if (groupedMovies[category].length > 1) {
            acc[category] = groupedMovies[category];
          }
          return acc;
        },
        {},
      );

      const moviesArray: Movies[] = Object.keys(filteredGroupedMovies).map(
        (category) => ({
          category,
          movies: filteredGroupedMovies[category],
        }),
      );

      return moviesArray;
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
}
