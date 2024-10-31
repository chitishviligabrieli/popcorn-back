import { Test, TestingModule } from '@nestjs/testing';
import { MovieMainService } from './movie-main.service';

describe('MovieMainService', () => {
  let service: MovieMainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieMainService],
    }).compile();

    service = module.get<MovieMainService>(MovieMainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
