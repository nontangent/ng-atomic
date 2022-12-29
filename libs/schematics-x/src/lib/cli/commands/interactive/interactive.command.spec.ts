import { TestBed } from "@nx-ddd/core";
import { Logger } from "../../logger";
import { SuggestPrompterFactory } from "../../prompters";
import { HistoryService } from "../../services/history";
import { mockHistoryService } from "../../services/history/testing";
import { InteractiveCommand } from './interactive.command';
import { InteractiveModule } from './interactive.module';

describe('InteractiveCommand', () => {
  let command: InteractiveCommand;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InteractiveModule],
      providers: [
        { provide: HistoryService, useValue: mockHistoryService },
        // { provide: SuggestPrompterFactory, useValue: {} },
        // { provide: Logger, useValue: {}},
      ]
    });
    command = TestBed.inject(InteractiveCommand);
  });

  it('should be created', () => {
    expect(command).toBeTruthy();
  });

  it('registerPrompt', async () => {
    await command.action();
  });
});
