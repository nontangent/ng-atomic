import { OutputFileEntryEstimator } from '../output-file-entry.estimator';

export const mockOutputFileEntryEstimator: jest.Mocked<OutputFileEntryEstimator> = {
  estimate: jest.fn(),
  buildInstructions: jest.fn(),
};
