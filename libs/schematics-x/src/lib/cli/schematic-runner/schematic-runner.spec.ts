import { TestBed } from "@nx-ddd/core";
import { DEBUG, STD_ERR, STD_OUT } from "../workflow-runner/handlers";
import { SchematicRunner } from './schematic-runner';
import { SchematicRunnerModule } from './schematic-runner.module';

describe('SchematicRunner', () => {
  let schematicRunner: SchematicRunner;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SchematicRunnerModule],
      providers: [
        { provide: DEBUG, useValue: true },
        { provide: STD_OUT, useValue: process.stdout },
        { provide: STD_ERR, useValue: process.stderr },
      ],
    });
    schematicRunner = TestBed.inject(SchematicRunner);
  });

  it('should be created', () => {
    expect(schematicRunner).toBeTruthy();
  });
});
