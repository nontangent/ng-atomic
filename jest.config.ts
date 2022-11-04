const { getJestProjects } = require('@nrwl/jest');

export default {
  projects: [
    ...getJestProjects(),
    '<rootDir>/apps/elements',
    '<rootDir>/apps/editor',
    '<rootDir>/apps/api',
  ],
};
