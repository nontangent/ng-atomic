const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  projects: [
    ...getJestProjects(),
    '<rootDir>/apps/elements',
    '<rootDir>/apps/editor',
    '<rootDir>/apps/api',
  ],
};
