import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MovieEntity } from '../../movies/entities/movie.entity';

@Entity()
export class GenresEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  genre: string;

  @ManyToMany(() => MovieEntity, (movie) => movie.genres)
  movies: MovieEntity[];
}
