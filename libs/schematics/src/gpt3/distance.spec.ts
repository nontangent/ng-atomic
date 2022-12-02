import { calculateDistance, convertByWords, parseFilePath, standarization } from './distance';

describe('standarization', () => {
  it('', () => {
    expect(standarization(
      '/libs/example/src/lib/domain/models/first-model.ts',
      '/libs/example/src/lib/domain/models/second-model.ts',
    )).toEqual([
      '/0/1/2/3/4/5/6.7',
      '/0/1/2/3/4/5/8.7',
    ])
  }); 
});

describe('calculateDistance()', () => {
  it('', () => {
    expect(calculateDistance(
      '/libs/example/src/lib/domain/models/first-model.ts',
      '/libs/example/src/lib/domain/models/second-model.ts',
    )).toEqual(1)
  });

  it('', () => {
    expect(calculateDistance(
      '/libs/example/src/lib/domain/models/first-model.component.ts',
      '/libs/example/src/lib/domain/models/second-model.module.ts',
    )).toEqual(2)
  });
});

describe('parseFilePath', () => {
  it('should parse file path', () => {
    expect(parseFilePath('/projects/app/src/app/_shared/components/example/example.component.ts')).toEqual([
      '/', 'projects', '/', 'app', '/',  'src', '/',  'app', '/',  '_shared', '/',  
      'components', '/', 'example', '/', 'example', '.', 'component', '.', 'ts'
    ]);
  });
});

describe('convertByWords', () => {
  xit('should convert from a string to a number', () => {
    expect(convertByWords('this/is/test/path', ['this', 'is', 'test', 'path'])).toBe('0/1/2/3');
  });
});

