import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MoviesRepository } from "./movies.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MoviesEntity } from "./entities/movie.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([MoviesEntity, MoviesRepository])
  ],
  controllers: [MoviesController],
  providers: [MoviesService, MoviesRepository],
  exports: [MoviesService, MoviesRepository]
})
export class MoviesModule {}
