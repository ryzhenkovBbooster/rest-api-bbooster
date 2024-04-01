import { Test, TestingModule } from '@nestjs/testing';
import { PbxService } from './pbx.service';

describe('PbxService', () => {
  let service: PbxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PbxService],
    }).compile();

    service = module.get<PbxService>(PbxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
