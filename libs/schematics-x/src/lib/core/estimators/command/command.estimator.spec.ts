import { CommandEstimator } from './command.estimator';
import { CommandModule } from './command.module';
import { TestBed } from '@nx-ddd/core';

describe('CommandEstimator', () => {
  let estimator: CommandEstimator;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ CommandModule ]
    });
    estimator = TestBed.inject(CommandEstimator);
  });

  it('should create', () => {
    expect(estimator).toBeTruthy();
  });

  it('should estimate', async () => {
    const INPUT = [
      "auto pages/scholarships",
      "instruct -t pages/pages.module.ts Add `scholarships` to routes",
      "instruct -t pages/pages.module.ts Add `scholarships` to routes",
      "auto pages/common",
      "auto pages/common/community",
      "auto pages/owners",
      "auto pages/owners",
      "auto pages/owners --verbose",
      "auto pages/owners --inputScope pages/profile",
      "instruct -t pages/pages.module.ts Add `owners` to routes",
      "auto pages/accounts",
      "auto pages/accounts --inputScope pages/profile",
      "instruct -t pages/pages.module.ts Add `accounts` to routes",
      "instruct -t pages/pages.module.ts Add `accounts` to routes",
      "instruct -t pages/pages.module.ts Push `accounts` to routes array",
      "instruct -t pages/pages.module.ts Add `accounts` route to routes",
      "instruct -t pages/pages.module.ts Add `accounts` route to routes",
      "instruct -t pages/pages.module.ts Add `ng-japan",
    ];
    const results = await estimator.estimate(INPUT, '');
    expect(results).toEqual(['a', 'b', 'c']);
  });
});
