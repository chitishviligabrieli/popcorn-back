import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { GenresEntity } from '../../genres/entities/genre.entity';

@Entity()
export class MovieEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tconst: string;

  @Column()
  titleType: string;

  @Column()
  primaryTitle: string;

  @Column()
  originalTitle: string;

  @Column()
  isAdult: string;

  @Column()
  startYear: number;

  @Column()
  endYear: number;

  @Column()
  runtimeMinutes: number;

  @Column('simple-array')
  genres: string[];

  @ManyToMany(() => GenresEntity, (genres) => genres.movies)
  @JoinTable()
  genre: GenresEntity[];
}
