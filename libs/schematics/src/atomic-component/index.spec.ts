import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import {
  buildExpectedFilePaths,
  createWorkspace,
  defaultWorkspaceOptions,
  defaultAppOptions,
  getTestProjectPath,
} from '../_testing';

const COLLECTION_PATH = path.join(__dirname, '../../collection.json');

describe('AtomicComponent Schematics', () => {
  const runner = new SchematicTestRunner('@ng-atomic/schematics', COLLECTION_PATH);
  let tree: UnitTestTree;

  beforeEach(async () => {
    tree = await createWorkspace(runner, tree);
  });

  it('should create atomic component files', async () => {
    const options = {project: 'app', name: '_shared/components/example'};
    const projectPath = getTestProjectPath(defaultWorkspaceOptions, {...defaultAppOptions, name: 'app'});
    const expectedFilePaths = buildExpectedFilePaths(options.name, 'example', projectPath, 'component');

    const { files } = await runner.runSchematicAsync('atomic-component', options, tree).toPromise();
    expectedFilePaths.forEach(path => expect(files.includes(path)).toBeTruthy());
  });

  it('should create atomic component files', async () => {
    const projectPath = getTestProjectPath(defaultWorkspaceOptions, {...defaultAppOptions, name: 'app'});

    tree = await runner.runSchematicAsync('atomic-component', {project: 'app', name: '_shared/components/first'}, tree).toPromise();
    tree = await runner.runSchematicAsync('atomic-component', {project: 'app', name: '_shared/components/second'}, tree).toPromise();

    buildExpectedFilePaths('_shared/components/first', 'first', projectPath, 'component').forEach(path => {
      expect(tree.files.includes(path)).toBeTruthy()
    });
    buildExpectedFilePaths('_shared/components/second', 'second', projectPath, 'component').forEach(path => {
      expect(tree.files.includes(path)).toBeTruthy()
    });

    const source = tree.read('/projects/app/src/app/_shared/components/index.ts')!.toString('utf-8');
    expect(source).toEqual(`export * from './first';\nexport * from './second';`);
  });
});

describe('Atom Schematics', () => {
  const runner = new SchematicTestRunner('@ng-atomic/schematics', COLLECTION_PATH);
  let tree: UnitTestTree;

  beforeEach(async () => {
    tree = await createWorkspace(runner, tree);
  });

  it('should create atom files', async () => {
    const options = {project: 'app', name: '_shared/components/example'};
    const projectPath = getTestProjectPath(defaultWorkspaceOptions, {...defaultAppOptions, name: 'app'});
    const expectedFilePaths = buildExpectedFilePaths(options.name, 'example', projectPath, 'atom');
    
    const { files } = await runner.runSchematicAsync('atom', options, tree).toPromise();
    expectedFilePaths.forEach(path => expect(files.includes(path)).toBeTruthy());
  });
});

describe('Molecule Schematics', () => {
  const runner = new SchematicTestRunner('@ng-atomic/schematics', COLLECTION_PATH);
  let tree: UnitTestTree;

  beforeEach(async () => {
    tree = await createWorkspace(runner, tree);
  });

  it('should create molecule files', async () => {
    const options = {project: 'app', name: '_shared/components/example'};
    const projectPath = getTestProjectPath(defaultWorkspaceOptions, {...defaultAppOptions, name: 'app'});
    const expectedFilePaths = buildExpectedFilePaths(options.name, 'example', projectPath, 'molecule');
    
    const { files } = await runner.runSchematicAsync('molecule', options, tree).toPromise();
    expectedFilePaths.forEach(path => expect(files.includes(path)).toBeTruthy());
  });
});

describe('Organism Schematics', () => {
  const runner = new SchematicTestRunner('@ng-atomic/schematics', COLLECTION_PATH);
  let tree: UnitTestTree;

  beforeEach(async () => {
    tree = await createWorkspace(runner, tree);
  });

  it('should create organism files', async () => {
    const options = {project: 'app', name: '_shared/components/example'};
    const projectPath = getTestProjectPath(defaultWorkspaceOptions, {...defaultAppOptions, name: 'app'});
    const expectedFilePaths = buildExpectedFilePaths(options.name, 'example', projectPath, 'organism');
    
    const { files } = await runner.runSchematicAsync('organism', options, tree).toPromise();
    expectedFilePaths.forEach(path => expect(files.includes(path)).toBeTruthy());
  });
});

describe('Template Schematics', () => {
  const runner = new SchematicTestRunner('@ng-atomic/schematics', COLLECTION_PATH);
  let tree: UnitTestTree;

  beforeEach(async () => {
    tree = await createWorkspace(runner, tree);
  });

  it('should create template files', async () => {
    const options = {project: 'app', name: '_shared/components/example'};
    const projectPath = getTestProjectPath(defaultWorkspaceOptions, {...defaultAppOptions, name: 'app'});
    const expectedFilePaths = buildExpectedFilePaths(options.name, 'example', projectPath, 'template');
    
    const { files } = await runner.runSchematicAsync('template', options, tree).toPromise();
    expectedFilePaths.forEach(path => expect(files.includes(path)).toBeTruthy());
  });
});
