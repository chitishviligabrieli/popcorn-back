import { Module } from '@nestjs/common';
import { ArtistMainService } from './artist-main.service';
import { ArtistMainController } from './artist-main.controller';

@Module({
  controllers: [ArtistMainController],
  providers: [ArtistMainService],
})
export class ArtistMainModule {}
