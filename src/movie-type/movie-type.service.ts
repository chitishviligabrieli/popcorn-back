import { Injectable } from '@nestjs/common';
import { CreateMovieTypeDto } from './dto/create-movie-type.dto';
import { UpdateMovieTypeDto } from './dto/update-movie-type.dto';

@Injectable()
export class MovieTypeService {
  create(createMovieTypeDto: CreateMovieTypeDto) {
    return 'This action adds a new movieType';
  }

  findAll() {
    return `This action returns all movieType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movieType`;
  }

  update(id: number, updateMovieTypeDto: UpdateMovieTypeDto) {
    return `This action updates a #${id} movieType`;
  }

  remove(id: number) {
    return `This action removes a #${id} movieType`;
  }
}
