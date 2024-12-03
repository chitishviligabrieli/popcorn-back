import { Module } from '@nestjs/common';
import { JustWatchService } from './justwatch.service';
import { JustwatchController } from './justwatch.controller';
import { MoviesModule } from "../movies/movies.module";
import { MoviesRepository } from "../movies/movies.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MoviesEntity } from "../movies/entities/movie.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([MoviesEntity, MoviesRepository]), MoviesModule
  ],
  controllers: [JustwatchController],
  providers: [JustWatchService, ]

})
export class JustWatchModule {}
