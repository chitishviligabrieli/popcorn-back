import { Injectable } from '@nestjs/common';
import { CreateArtistMainDto } from './dto/create-artist-main.dto';
import { UpdateArtistMainDto } from './dto/update-artist-main.dto';

@Injectable()
export class ArtistMainService {
  create(createArtistMainDto: CreateArtistMainDto) {
    return 'This action adds a new artistMain';
  }

  findAll() {
    return `This action returns all artistMain`;
  }

  findOne(id: number) {
    return `This action returns a #${id} artistMain`;
  }

  update(id: number, updateArtistMainDto: UpdateArtistMainDto) {
    return `This action updates a #${id} artistMain`;
  }

  remove(id: number) {
    return `This action removes a #${id} artistMain`;
  }
}
