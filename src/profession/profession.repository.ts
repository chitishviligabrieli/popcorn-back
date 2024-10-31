import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from '../movies/entities/movie.entity';
import { Repository } from 'typeorm';
import { ProfessionEntity } from './entities/profession.entity';

@Injectable()
export class ProfessionRepository {
  constructor(@InjectRepository(ProfessionEntity)
              private readonly professionRepository: Repository<ProfessionEntity>) {
  }

  async create(){

  }
}