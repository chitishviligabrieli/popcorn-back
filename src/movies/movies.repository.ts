import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { MoviesEntity } from './entities/movie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesRepository {
  constructor(@InjectRepository(MoviesEntity)
              private readonly movieRepository: Repository<MoviesEntity>) {
  }

  async findAll(): Promise<MoviesEntity[]> {
    return await this.movieRepository
      .createQueryBuilder('movies')
      .leftJoinAndSelect('movies.ratings', 'ratings')
      .where('')
      .limit(5)
      .getMany();
  }

  async findBatch(offset: number, limit: number): Promise<MoviesEntity[]> {
    return this.movieRepository
      .createQueryBuilder('movies')
      .skip(offset)
      .take(limit)
      .getMany();
  }

  async save (movie: MoviesEntity): Promise<MoviesEntity> {
    return this.movieRepository.save(movie);
  }


}