import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';
import { ArtistsRepository } from './artists.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArtistEntity, ArtistsRepository])
  ],
  controllers: [ArtistsController],
  providers: [ArtistsService, ArtistsRepository, ArtistEntity],
  exports: [ArtistEntity, TypeOrmModule]
})
export class ArtistsModule {}
