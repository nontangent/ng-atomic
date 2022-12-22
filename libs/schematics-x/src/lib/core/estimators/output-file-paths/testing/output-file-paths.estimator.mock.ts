import { OutputFilePathsEstimator } from '../output-file-paths.estimator';

export const mockOutputFilePathsEstimator: jest.Mocked<OutputFilePathsEstimator> = {
  estimate: jest.fn(),
};
