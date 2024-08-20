import { Test, TestingModule } from '@nestjs/testing';
import { OutsidedbController } from './outsidedb.controller';

describe('OutsidedbController', () => {
  let controller: OutsidedbController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OutsidedbController],
    }).compile();

    controller = module.get<OutsidedbController>(OutsidedbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
