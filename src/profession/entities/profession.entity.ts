import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ArtistEntity } from '../../artists/entities/artist.entity';

@Entity()
export class ProfessionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  profession: string;

  @ManyToMany(() => ArtistEntity, (artist) => artist.professions)
  artist: ArtistEntity[];
}
