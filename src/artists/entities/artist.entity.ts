import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProfessionEntity } from '../../profession/entities/profession.entity';

@Entity()
export class ArtistEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nconst: string;

  @Column()
  primaryName: string;

  @Column()
  birthYear: string;

  @Column()
  deathYear: string;

  @Column()
  primaryProfession: string;

  @Column()
  KnownForTitles:string;

  @ManyToMany(() => ProfessionEntity, (profession) => profession.artist)
  @JoinTable()
  professions: ProfessionEntity[];
}
