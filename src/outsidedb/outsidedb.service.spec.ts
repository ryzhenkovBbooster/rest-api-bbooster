import { Test, TestingModule } from '@nestjs/testing';
import { OutsidedbService } from './outsidedb.service';

describe('OutsidedbService', () => {
  let service: OutsidedbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OutsidedbService],
    }).compile();

    service = module.get<OutsidedbService>(OutsidedbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
