import { Column, Entity } from 'typeorm';

@Entity()
export class ArtistMain {
  @Column()
  primaryName:string
}
