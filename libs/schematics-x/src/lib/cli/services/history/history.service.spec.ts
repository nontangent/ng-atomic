import { TestBed } from "@nx-ddd/core";
import { HistoryService } from './history.service';
import { HistoryModule } from './history.module';

describe('HistoryService', () => {
  let service: HistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HistoryModule],
    });
    service = TestBed.inject(HistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a command to the history', async () => {
    await service.add(['test']);
    const history = await service.list();
    expect(history).toContain('test');
  });
});
