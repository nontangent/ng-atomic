import { OutputFilePathsEstimator } from './output-file-paths.estimator';

describe('OutputFilePathsEstimator V2', () => {
  let outputFilePathsEstimator: OutputFilePathsEstimator;

  beforeEach(() => {
    outputFilePathsEstimator = new OutputFilePathsEstimator();
  });

  it('should create', () => {
    expect(outputFilePathsEstimator).toBeTruthy();
  });
});
