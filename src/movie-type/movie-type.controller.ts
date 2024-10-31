import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MovieTypeService } from './movie-type.service';
import { CreateMovieTypeDto } from './dto/create-movie-type.dto';
import { UpdateMovieTypeDto } from './dto/update-movie-type.dto';

@Controller('movie-type')
export class MovieTypeController {
  constructor(private readonly movieTypeService: MovieTypeService) {}

  @Post()
  create(@Body() createMovieTypeDto: CreateMovieTypeDto) {
    return this.movieTypeService.create(createMovieTypeDto);
  }

  @Get()
  findAll() {
    return this.movieTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieTypeDto: UpdateMovieTypeDto) {
    return this.movieTypeService.update(+id, updateMovieTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieTypeService.remove(+id);
  }
}
