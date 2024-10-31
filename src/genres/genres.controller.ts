import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  // @Post()
  // async createGenre():Promise<void>{
  //   await  this.genresService.createGenres()
  //   console.log('asdadsadasdasd')
  // }

  @Post()
  async genremap(): Promise <any>{
    await this.genresService.genreMap()
  }
}
