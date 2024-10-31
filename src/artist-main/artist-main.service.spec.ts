import { Test, TestingModule } from '@nestjs/testing';
import { ArtistMainService } from './artist-main.service';

describe('ArtistMainService', () => {
  let service: ArtistMainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArtistMainService],
    }).compile();

    service = module.get<ArtistMainService>(ArtistMainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
