import { SchematicsSequenceEstimator } from '../schematics-sequence.estimator';

export const mockSchematicsSequenceEstimator: jest.Mocked<Partial<SchematicsSequenceEstimator>> = {
  estimate: jest.fn(),
};
