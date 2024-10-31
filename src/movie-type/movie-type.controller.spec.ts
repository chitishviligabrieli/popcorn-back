import { Test, TestingModule } from '@nestjs/testing';
import { MovieTypeController } from './movie-type.controller';
import { MovieTypeService } from './movie-type.service';

describe('MovieTypeController', () => {
  let controller: MovieTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieTypeController],
      providers: [MovieTypeService],
    }).compile();

    controller = module.get<MovieTypeController>(MovieTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
