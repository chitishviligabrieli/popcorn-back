import { Test, TestingModule } from '@nestjs/testing';
import { JustWatchService } from './justwatch.service';

describe('JustwatchService', () => {
  let service: JustWatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JustWatchService],
    }).compile();

    service = module.get<JustWatchService>(JustWatchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
