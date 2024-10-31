import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenresEntity } from './entities/genre.entity';
import { MovieModule } from '../movies/movie.module';
import { GenresRepository } from './genres.repository';

@Module({
  imports: [TypeOrmModule.forFeature([GenresEntity, GenresRepository]), MovieModule],
  controllers: [GenresController],
  providers: [GenresService, GenresEntity],
})
export class GenresModule {}
