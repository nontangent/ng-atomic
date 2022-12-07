import { RelatedFilePathsEstimator } from "./related-file-paths.estimator";

describe('RelatedFilePathsEstimator V2', () => {
  let relatedFilePathsEstimator: RelatedFilePathsEstimator;

  beforeEach(() => {
    relatedFilePathsEstimator = new RelatedFilePathsEstimator();
  });

  it('should create', () => {
    expect(relatedFilePathsEstimator).toBeTruthy();
  });
});
