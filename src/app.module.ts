import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { MovieModule } from './movies/movie.module';
import { ConfigModule } from '@nestjs/config';
import { ArtistsModule } from './artists/artists.module';
import { GenresModule } from './genres/genres.module';
import { MovieTypeModule } from './movie-type/movie-type.module';
import { MovieMainModule } from './movie-main/movie-main.module';
import { ArtistMainModule } from './artist-main/artist-main.module';
import { ProfessionModule } from './profession/profession.module';
import process from 'node:process';

@Module({
  imports: [TypeOrmModule.forRoot({
    port: 3306,
    host: 'localhost',
    username: 'root',
    password: 'gabr12ieli34',
    database: 'popcorn',
    autoLoadEntities: true,
    synchronize: true,
    type: 'mysql',
  }), ConfigModule.forRoot({}), MovieModule, ArtistsModule, GenresModule, MovieTypeModule, MovieMainModule, ArtistMainModule, ProfessionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
