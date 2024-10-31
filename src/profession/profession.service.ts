import { Injectable } from '@nestjs/common';
import { CreateProfessionDto } from './dto/create-profession.dto';
import { UpdateProfessionDto } from './dto/update-profession.dto';
import { ProfessionRepository } from './profession.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from '../artists/entities/artist.entity';
import { Repository } from 'typeorm';
import { ProfessionEntity } from './entities/profession.entity';

@Injectable()
export class ProfessionService {
  constructor(
    @InjectRepository(ArtistEntity) private artistRepository: Repository<ArtistEntity>,
    @InjectRepository(ProfessionEntity) private professionRepository: Repository<ProfessionEntity>,
  ) {
  }

  async createProfessinos(): Promise<void> {

    const batchSize = 1000;
    let offset = 0;
    const professionSet = new Set<string>();


    while (true) {
      const artist = await this.artistRepository.find({
        skip: offset,
        take: batchSize,
      });

      if(artist.length === 0) break


      let primaryProfession: string[];
      artist.forEach((artist) => {
        primaryProfession = artist.primaryProfession.split(',');
        console.log(primaryProfession);
        primaryProfession.forEach((profession) => {
          professionSet.add(profession.trim().toLowerCase());
        });
      });

      for (const professionName of professionSet) {
        const existingProfession = await this.professionRepository.findOne({ where: { profession: professionName } });

        if (!existingProfession) {
          const newProfession = await this.professionRepository.create({ profession: professionName });
          await this.professionRepository.save(newProfession);
        }
      }
    }
  }

  async professionMap () {
    const batchSize = 1000;
    let offset = 0;
    let butchNumber = 1

    while (true) {
      const artists = await this.artistRepository.find({
        skip: offset,
        take: batchSize,
      });

      if (artists.length === 0) break;

      for (let i = 0; i < artists.length; i++) {
        const professionName = artists[i].primaryProfession.split(','); // Assuming genres array has 'name' field

        const profession = await this.professionRepository
          .createQueryBuilder('profession')
          .select()
          .where('profession IN (:...professionName)', { professionName })
          .getMany();

        artists[i].professions = profession;


        await this.artistRepository.save(artists[i]);
      }
      offset += batchSize;
      butchNumber ++

      console.log( butchNumber ,batchSize)
    }
  }
}
