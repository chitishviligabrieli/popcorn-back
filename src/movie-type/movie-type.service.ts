import { Injectable } from '@nestjs/common';
import { CreateMovieTypeDto } from './dto/create-movie-type.dto';
import { UpdateMovieTypeDto } from './dto/update-movie-type.dto';

@Injectable()
export class MovieTypeService {
  create(createMovieTypeDto: CreateMovieTypeDto) {
    return 'This action adds a new movieType';
  }
}
