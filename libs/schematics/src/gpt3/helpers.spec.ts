import { getEstimateSimilarFilePaths } from './helpers';

describe('getEstimateSimilarFilePaths', () => {
  const FILES = [
    '/projects/app/src/styles.scss',
    '/projects/app/src/app/app.component.html',
    '/projects/app/src/app/_shared/components/example/example.module.ts',
    '/projects/app/src/app/_shared/components/example/example.component.html',
    '/projects/app/src/app/_shared/components/example/example.component.scss',
    '/projects/app/src/app/_shared/components/example/example.component.spec.ts',
    '/projects/app/src/app/_shared/components/example/example.component.ts',
    '/projects/app/src/app/_shared/components/example/example.stories.ts',
    '/projects/app/src/app/_shared/components/example/index.ts',
    '/projects/app/src/app/_shared/components/test/test.module.ts',
    '/projects/app/src/app/_shared/components/test/test.component.html',
    '/projects/app/src/app/_shared/components/test/test.component.scss',
    '/projects/app/src/app/_shared/components/test/test.component.spec.ts',
    '/projects/app/src/app/_shared/components/test/test.component.ts',
    '/projects/app/src/app/_shared/components/test/test.stories.ts',
    '/projects/app/src/app/_shared/components/test/index.ts',
    '/libs/nm-common/src/lib/domain/models/invoice.ts',
    '/libs/nm-common/src/lib/domain/models/contract.ts',
  ];

  it('', () => {
    const result = getEstimateSimilarFilePaths('/libs/nm-common/src/lib/domain/models/customer.ts', FILES);
    expect(result).toEqual([
      '/libs/nm-common/src/lib/domain/models/invoice.ts',
      '/libs/nm-common/src/lib/domain/models/contract.ts',
    ]);
  });

  it('', () => {
    const file = '/projects/app/src/app/_shared/components/expected/expected.component.ts';
    const files = getEstimateSimilarFilePaths(file, FILES);
    expect(files).toEqual([
      '/projects/app/src/app/_shared/components/example/example.component.ts',
      '/projects/app/src/app/_shared/components/test/test.component.ts',
    ]);
  });

  it('', () => {
    const file = '/projects/app/src/app/_shared/components/expected/expected.component.html';
    const files = getEstimateSimilarFilePaths(file, FILES);
    expect(files).toEqual([
      '/projects/app/src/app/_shared/components/example/example.component.html',
      '/projects/app/src/app/_shared/components/test/test.component.html',
    ]);
  });
});
