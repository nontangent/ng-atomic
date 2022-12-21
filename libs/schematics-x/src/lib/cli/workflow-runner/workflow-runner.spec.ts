import { TestBed } from "@nx-ddd/core";
import { WorkflowRunnerModule } from './workflow-runner.module';
import { WorkflowRunner } from './workflow-runner';
import { DEBUG, STD_ERR, STD_OUT } from "./handlers";

describe('WorkflowRunner', () => {
  let workflowRunner: WorkflowRunner;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WorkflowRunnerModule],
      providers: [
        { provide: DEBUG, useValue: true },
        { provide: STD_OUT, useValue: process.stdout },
        { provide: STD_ERR, useValue: process.stderr },
      ],
    });
    workflowRunner = TestBed.inject(WorkflowRunner);
  });

  it('should be created', () => {
    expect(workflowRunner).toBeTruthy();
  });
});
