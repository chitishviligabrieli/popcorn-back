import { Test, TestingModule } from '@nestjs/testing';
import { JustwatchController } from './justwatch.controller';
import { JustWatchService } from './justwatch.service';

describe('JustwatchController', () => {
  let controller: JustwatchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JustwatchController],
      providers: [JustWatchService],
    }).compile();

    controller = module.get<JustwatchController>(JustwatchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
