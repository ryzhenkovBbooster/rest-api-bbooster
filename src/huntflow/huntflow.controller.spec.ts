import { Test, TestingModule } from '@nestjs/testing';
import { HuntflowController } from './huntflow.controller';

describe('HuntflowController', () => {
  let controller: HuntflowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HuntflowController],
    }).compile();

    controller = module.get<HuntflowController>(HuntflowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
