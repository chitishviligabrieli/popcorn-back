import { Test, TestingModule } from '@nestjs/testing';
import { MovieTypeService } from './movie-type.service';

describe('MovieTypeService', () => {
  let service: MovieTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieTypeService],
    }).compile();

    service = module.get<MovieTypeService>(MovieTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
