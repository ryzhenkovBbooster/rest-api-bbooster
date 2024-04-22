import { Test, TestingModule } from '@nestjs/testing';
import { HuntflowService } from './huntflow.service';

describe('HuntflowService', () => {
  let service: HuntflowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HuntflowService],
    }).compile();

    service = module.get<HuntflowService>(HuntflowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
