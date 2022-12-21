import { CommandEstimator } from './command.estimator';
import { CommandModule } from './command.module';
import { TestBed } from '@nx-ddd/core';

describe('CommandEstimator', () => {
  let estimator: CommandEstimator;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ CommandModule ]
    });
    estimator = TestBed.inject(CommandEstimator);
  });

  it('should create', () => {
    expect(estimator).toBeTruthy();
  });

  it('should estimate', async () => {
    const inputFilePaths = ['a', 'b', 'c'];
    const outputFilePath = 'd';
    const results = await estimator.estimate(inputFilePaths, outputFilePath);
    expect(results).toEqual(['a', 'b', 'c']);
  });
});
