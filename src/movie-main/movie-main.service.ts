import { Injectable } from '@nestjs/common';
import { CreateMovieMainDto } from './dto/create-movie-main.dto';
import { UpdateMovieMainDto } from './dto/update-movie-main.dto';

@Injectable()
export class MovieMainService {
  create(createMovieMainDto: CreateMovieMainDto) {
    return 'This action adds a new movieMain';
  }

  findAll() {
    return `This action returns all movieMain`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movieMain`;
  }

  update(id: number, updateMovieMainDto: UpdateMovieMainDto) {
    return `This action updates a #${id} movieMain`;
  }

  remove(id: number) {
    return `This action removes a #${id} movieMain`;
  }
}
