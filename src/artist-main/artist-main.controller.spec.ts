import { Test, TestingModule } from '@nestjs/testing';
import { ArtistMainController } from './artist-main.controller';
import { ArtistMainService } from './artist-main.service';

describe('ArtistMainController', () => {
  let controller: ArtistMainController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtistMainController],
      providers: [ArtistMainService],
    }).compile();

    controller = module.get<ArtistMainController>(ArtistMainController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
