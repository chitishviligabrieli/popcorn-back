import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MoviesEntity {
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

  @Column({ nullable: true })
  isAdult: boolean;

  @Column()
  startYear: string;

  @Column({nullable: true})
  endYear: string;

  @Column({nullable: true})
  runtimeMinutes: string;

  @Column()
  genre: string;

  @Column({type: 'longtext'})
  jsonData: string;

  @Index()
  @Column( {nullable: true, default: 0 } )
  parsed: boolean

  @Column({nullable: true, default: 0})
  notData: boolean;
}
