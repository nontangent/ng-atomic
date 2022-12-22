import { TestBed } from '@nx-ddd/core';
import { Schematic, SchematicsSequenceEstimator } from './schematics-sequence.estimator';
import { SchematicsSequenceModule } from './schematics-sequence.module';

describe('SchematicsSequenceEstimator', () => {
  let estimator: SchematicsSequenceEstimator;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SchematicsSequenceModule],
    });
    estimator = TestBed.inject(SchematicsSequenceEstimator);
  });

  it('should create', () => {
    expect(estimator).toBeTruthy();
  });

  it('should estimate', async () => {
    const input: Schematic[] = [
      {collection: "schematics-x", name: "auto", options: {path: "pages/user"}},
      {collection: "schematics-x", name: "instruct", options: {target: "pages/pages.module", "instruct": "Add route for `pages/user`"}}, 
      {collection: "schematics-x", name: "auto", options: {path: "pages/group"}},
    ];
    const expected = [
      {collection: "schematics-x", name: "instruct", options: {target: "pages/pages.module",  "instruct": "Add route for `pages/group`"}},
    ];
    expect(await estimator.estimate(input)).toEqual(expected);
  });
});
