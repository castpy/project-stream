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

  @Get('movie/highlights')
  getHighlights() {
    console.log('getHighlights');
    return this.appService.getHighlights();
  }

  @Get('movie/:id')
  getMovieById(@Param('id') id: string) {
    return this.appService.getMovieById(id);
  }
}
