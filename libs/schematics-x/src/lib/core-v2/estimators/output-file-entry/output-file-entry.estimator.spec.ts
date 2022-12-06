import { OutputFileEntryEstimator } from './output-file-entry.estimator';

describe('OutputFileEntryEstimator V2', () => {
  let outputFileEntryEstimator: OutputFileEntryEstimator;

  beforeEach(() => {
    outputFileEntryEstimator = new OutputFileEntryEstimator();
  });

  it('should create', () => {
    expect(outputFileEntryEstimator).toBeTruthy();
  });
});
