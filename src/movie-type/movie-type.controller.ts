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
}
