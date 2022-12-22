import { RelatedFilePathsEstimator } from '../related-file-paths.estimator';

export const mockRelatedFilePathsEstimator: jest.Mocked<RelatedFilePathsEstimator> = {
  estimate: jest.fn(),
};
