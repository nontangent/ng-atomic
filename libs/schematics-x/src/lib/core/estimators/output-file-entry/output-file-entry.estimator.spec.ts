import { TestBed } from '@nx-ddd/core';
import { OutputFileEntryEstimator } from './output-file-entry.estimator';
import { OutputFileEntryModule } from './output-file-entry.module';

describe('OutputFileEntryEstimator', () => {
  let estimator: OutputFileEntryEstimator;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OutputFileEntryModule],
    });
    estimator = TestBed.inject(OutputFileEntryEstimator);
  });

  it('should create', () => {
    expect(estimator).toBeTruthy();
  });
});
