import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { MovieRepository } from '../movies/movie.repository';
import { ArtistsRepository } from './artists.repository';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly artistsRepository: ArtistsRepository,
  ) {}

  async findAll() {
    const artistArray = await this.artistsRepository.findAll();

    for(let i = 0; i < artistArray.length; i+1000) {

    }
  }

}
