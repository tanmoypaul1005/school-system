import { Test, TestingModule } from '@nestjs/testing';
import { ClassSlotService } from './class-slot.service';

describe('ClassSlotService', () => {
  let service: ClassSlotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassSlotService],
    }).compile();

    service = module.get<ClassSlotService>(ClassSlotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
