import { Test, TestingModule } from '@nestjs/testing';
import { MovieMainController } from './movie-main.controller';
import { MovieMainService } from './movie-main.service';

describe('MovieMainController', () => {
  let controller: MovieMainController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieMainController],
      providers: [MovieMainService],
    }).compile();

    controller = module.get<MovieMainController>(MovieMainController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
