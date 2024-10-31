import { Module } from '@nestjs/common';
import { MovieMainService } from './movie-main.service';
import { MovieMainController } from './movie-main.controller';

@Module({
  controllers: [MovieMainController],
  providers: [MovieMainService],
})
export class MovieMainModule {}
