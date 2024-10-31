import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { MovieEntity } from './entities/movie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MovieRepository {
  constructor(@InjectRepository(MovieEntity)
              private readonly movieRepository: Repository<MovieEntity>) {
  }

  async findAll(): Promise<MovieEntity[]> {
    return await this.movieRepository
      .createQueryBuilder('movies')
      .select()
      .limit(5)
      .getMany();
  }

}
