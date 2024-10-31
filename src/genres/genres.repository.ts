import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from '../movies/entities/movie.entity';
import { Repository } from 'typeorm';
import { GenresEntity } from './entities/genre.entity';

@Injectable()
export class GenresRepository {
  constructor(@InjectRepository(GenresEntity)
              private readonly genresRepository: Repository<GenresEntity>) {
  }



}