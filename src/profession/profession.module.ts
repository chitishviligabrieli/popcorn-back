import { Module } from '@nestjs/common';
import { ProfessionService } from './profession.service';
import { ProfessionController } from './profession.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessionEntity } from './entities/profession.entity';
import { ProfessionRepository } from './profession.repository';
import { ArtistsModule } from '../artists/artists.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfessionEntity, ProfessionRepository]), ArtistsModule
  ],
  controllers: [ProfessionController],
  providers: [ProfessionService, ProfessionRepository],
})
export class ProfessionModule {}
