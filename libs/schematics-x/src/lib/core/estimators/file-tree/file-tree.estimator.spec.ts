import { FileTreeEstimator } from "./file-tree.estimator";

jest.setTimeout(3000 * 1000);

describe('FileTreeEstimator', () => {
  let estimator: FileTreeEstimator;

  beforeEach(() => {
    estimator = new FileTreeEstimator();
  });

  it('should be defined', () => {
    expect(estimator).toBeDefined();
  });

  describe('estimate()', () => {
    it('should estimate', async () => {
      const output = await estimator.estimate([
        '/root/components/user/user.component.ts',
        '/root/components/user/user.component.html',
        '/root/components/user/user.component.scss',
        '/root/components/user/user.component.spec.ts',
        '/root/components/user/user.component.stories.ts',
        '/root/components/user/user.module.ts',
        '/root/components/user/index.ts',
        '/root/package.json',
      ], '/root/components/profile');
      expect(output).toEqual([
        '/root/components/profile/profile.component.ts',
        '/root/components/profile/profile.component.html',
        '/root/components/profile/profile.component.scss',
        '/root/components/profile/profile.component.spec.ts',
        '/root/components/profile/profile.component.stories.ts',
        '/root/components/profile/profile.module.ts',
        '/root/components/profile/index.ts',
      ]); 
    });
  });
});
