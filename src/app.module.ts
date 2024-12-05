import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { MoviesEntity } from "./movies/entities/movie.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      port: 3306,
      host: 'localhost',
      username: 'root',
      password: '12345678',
      database: 'popcorn',
      entities: [MoviesEntity],
      autoLoadEntities: true,
      synchronize: true,
      type: 'mysql',
    }),
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
