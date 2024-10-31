import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MovieMainService } from './movie-main.service';
import { CreateMovieMainDto } from './dto/create-movie-main.dto';
import { UpdateMovieMainDto } from './dto/update-movie-main.dto';

@Controller('movie-main')
export class MovieMainController {
  constructor(private readonly movieMainService: MovieMainService) {}

  @Post()
  create(@Body() createMovieMainDto: CreateMovieMainDto) {
    return this.movieMainService.create(createMovieMainDto);
  }

  @Get()
  findAll() {
    return this.movieMainService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieMainService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieMainDto: UpdateMovieMainDto) {
    return this.movieMainService.update(+id, updateMovieMainDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieMainService.remove(+id);
  }
}
