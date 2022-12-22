import { TestBed } from "@nx-ddd/core";
import { RelatedFilePathsEstimator } from "./related-file-paths.estimator";
import { RelatedFilePathsModule } from "./related-file-paths.module";

describe('RelatedFilePathsEstimator V2', () => {
  let estimator: RelatedFilePathsEstimator;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RelatedFilePathsModule],
    });
    estimator = TestBed.inject(RelatedFilePathsEstimator);
  });

  it('should create', () => {
    expect(estimator).toBeTruthy();
  });
});
