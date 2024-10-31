import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from '../movies/entities/movie.entity';
import { In, Repository } from 'typeorm';
import { GenresEntity } from './entities/genre.entity';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(MovieEntity) private movieRepository: Repository<MovieEntity>,
    @InjectRepository(GenresEntity) private genresRepository: Repository<GenresEntity>,
  ) {
  }


  async genreMap() {
    const batchSize = 1000;
    let offset = 0;
    let batchNumber = 1
    let cont = 818177

    while (true) {
      const movies = await this.movieRepository.find({
        skip: offset,
        take: batchSize,
      });

      if (movies.length === 0) break;

      for (let i = 0; i < movies.length; i++) {
        const genreNames = movies[i].genres.map((genre) => genre); // Assuming genres array has 'name' field

        console.log(batchNumber, i, genreNames);

        const genres = await this.genresRepository
          .createQueryBuilder('genre')
          .select()
          .where('genre IN (:...genreNames)', { genreNames })
          .getMany();

        movies[i].genre = genres;

        await this.movieRepository.save(movies[i]);
      }

      offset += batchSize;
      batchNumber ++
    }
  }

  //   async
  //   createGenres()
  // :
  //   Promise < void > {
  //     console.log('Creating Genres');
  //     const batchSize = 1000;
  //     let offset = 0;
  //     const genresSet = new Set<string>();
  //
  //     while(true
  // )
  //   {
  //     const movies = await this.movieRepository.find({
  //       skip: offset,
  //       take: batchSize,
  //     });
  //
  //     if (movies.length === 0) break;
  //
  //     // let genresArr: string[];
  //     console.log(movies);
  //     movies.forEach((movie) => {
  //       movie.genres.forEach((genre) => {
  //         genresSet.add(genre);  // genre is a string in MovieEntity
  //       });
  //     });
  //     for (const genreName of genresSet) {
  //       const existingGenre = await this.genresRepository.findOne({ where: { genre: genreName } });
  //
  //       if (!existingGenre) {
  //         const newGenre = await this.genresRepository.create({ genre: genreName });
  //         await this.genresRepository.save(newGenre);
  //       }
  //     }
  //   }
  // }
  }
