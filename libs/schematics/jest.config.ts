/* eslint-disable */
export default {
  displayName: 'schematics',

  globals: {
    'ts-jest': { tsconfig: '<rootDir>/tsconfig.spec.json' },
  },
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/schematics',
  testEnvironment: 'node',
  preset: '../../jest.preset.js',
};
