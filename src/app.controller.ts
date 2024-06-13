import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Default')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('movies')
  getMovies() {
    return this.appService.getMovies();
  }

  @Get('movie/highlights')
  getHighlights() {
    return this.appService.getHighlights();
  }

  @Get('movie/embed/:id')
  getMovieEmbed(@Param('id') id: string) {
    return this.appService.getMovieEmbed(id);
  }

  @Get('movie/:id')
  getMovieById(@Param('id') id: string) {
    return this.appService.getMovieById(id);
  }
}
