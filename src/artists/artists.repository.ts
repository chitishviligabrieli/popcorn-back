import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from '../movies/entities/movie.entity';
import { Repository } from 'typeorm';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistsRepository {
  constructor(@InjectRepository(ArtistEntity)
              private readonly artistsRepository: Repository<ArtistEntity>) {
  }

  async findAll(): Promise<ArtistEntity[]> {
    return await this.artistsRepository
      .createQueryBuilder('movies')
      .select()
      .limit(3)
      .getMany();
  }
}