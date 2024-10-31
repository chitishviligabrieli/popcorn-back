import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { MovieRepository } from './movie.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovieEntity, MovieRepository])
  ],
  controllers: [MovieController],
  providers: [MovieService, MovieRepository],
  exports: [TypeOrmModule]
})
export class MovieModule {}
