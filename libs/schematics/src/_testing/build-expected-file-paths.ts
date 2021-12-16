export const buildExpectedFilePaths = (path: string, name: string, rootPath: string, type: string) => [
  `${path}/${name}.module.ts`, 
  `${path}/${name}.${type}.scss`, 
  `${path}/${name}.${type}.spec.ts`, 
  `${path}/${name}.${type}.ts`,
  `${path}/index.ts`,
].map(path => `${rootPath}/src/app/${path}`);
