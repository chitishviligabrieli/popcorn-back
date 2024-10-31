import { Module } from '@nestjs/common';
import { MovieTypeService } from './movie-type.service';
import { MovieTypeController } from './movie-type.controller';

@Module({
  controllers: [MovieTypeController],
  providers: [MovieTypeService],
})
export class MovieTypeModule {}
