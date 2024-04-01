import { Test, TestingModule } from '@nestjs/testing';
import { PbxController } from './pbx.controller';

describe('PbxController', () => {
  let controller: PbxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PbxController],
    }).compile();

    controller = module.get<PbxController>(PbxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
