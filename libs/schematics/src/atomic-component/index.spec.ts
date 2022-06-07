import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { readFileSync } from 'fs';
import path from 'path';
import { join } from 'path';
import {
  buildExpectedFilePaths,
  createWorkspace,
  defaultWorkspaceOptions,
  defaultAppOptions,
  getTestProjectPath,
  createNxWorkspace,
} from '../_testing';

const COLLECTION_PATH = path.join(__dirname, '../../collection.json');

describe('AtomicComponent Schematics', () => {
  const runner = new SchematicTestRunner('@ng-atomic/schematics', COLLECTION_PATH);
  let tree: UnitTestTree;

  describe('Angular Workspace', () => {
    beforeEach(async () => {
      tree = await createWorkspace(runner, tree);
    });
  
    it('should create atomic component files', async () => {
      const options = {project: 'app', path: '_shared/components', name: 'example'};
  
      const { files } = await runner.runSchematicAsync('atomic-component', options, tree).toPromise();
      expect(files).toContain('/projects/app/src/app/_shared/components/example/example.module.ts');
      expect(files).toContain('/projects/app/src/app/_shared/components/example/example.component.html');
      expect(files).toContain('/projects/app/src/app/_shared/components/example/example.component.scss');
      expect(files).toContain('/projects/app/src/app/_shared/components/example/example.component.spec.ts');
      expect(files).toContain('/projects/app/src/app/_shared/components/example/example.component.ts');
      expect(files).toContain('/projects/app/src/app/_shared/components/example/example.stories.ts');
      expect(files).toContain('/projects/app/src/app/_shared/components/example/index.ts');
    });
  
    it('should create atomic component files', async () => {
      tree = await runner.runSchematicAsync('atomic-component', {project: 'app', name: '_shared/components/first'}, tree).toPromise();
      tree = await runner.runSchematicAsync('atomic-component', {project: 'app', name: '_shared/components/second'}, tree).toPromise();
  
      const { files } = tree;
      expect(files).toContain('/projects/app/src/app/_shared/components/first/first.module.ts');
      expect(files).toContain('/projects/app/src/app/_shared/components/first/first.component.html');
      expect(files).toContain('/projects/app/src/app/_shared/components/first/first.component.scss');
      expect(files).toContain('/projects/app/src/app/_shared/components/first/first.component.spec.ts');
      expect(files).toContain('/projects/app/src/app/_shared/components/first/first.component.ts');
      expect(files).toContain('/projects/app/src/app/_shared/components/first/first.stories.ts');
      expect(files).toContain('/projects/app/src/app/_shared/components/first/index.ts');

      expect(files).toContain('/projects/app/src/app/_shared/components/second/second.module.ts');
      expect(files).toContain('/projects/app/src/app/_shared/components/second/second.component.html');
      expect(files).toContain('/projects/app/src/app/_shared/components/second/second.component.scss');
      expect(files).toContain('/projects/app/src/app/_shared/components/second/second.component.spec.ts');
      expect(files).toContain('/projects/app/src/app/_shared/components/second/second.component.ts');
      expect(files).toContain('/projects/app/src/app/_shared/components/second/second.stories.ts');
      expect(files).toContain('/projects/app/src/app/_shared/components/second/index.ts');
  
      // const source = tree.read('/projects/app/src/app/_shared/components/index.ts')!.toString('utf-8');
      // expect(source).toEqual(`export { FirstModule } from './first';\nexport { SecondModule } from './second';`);
    });
  
    it('should create atomic components files in app2', async () => {
      const options = {project: 'app2', name: '_shared/components/example'};
      const projectPath = getTestProjectPath(defaultWorkspaceOptions, {...defaultAppOptions, name: 'app2'});
      const expectedFilePaths = buildExpectedFilePaths(options.name, 'example', projectPath, 'component');
  
      const { files } = await runner.runSchematicAsync('atomic-component', options, tree).toPromise();
      expectedFilePaths.forEach(path => expect(files).toContain(path));
    });

    describe('given useTypeAsExtension is false', () => {
      it('should output `example.component.ts`', async () => {
        const options = {project: 'app2', name: '_shared/components/example', type: 'dialog', useTypeAsExtension: false};
        const projectPath = getTestProjectPath(defaultWorkspaceOptions, {...defaultAppOptions, name: 'app2'});
        const expectedFilePaths = buildExpectedFilePaths(options.name, 'example', projectPath, 'component');
    
        tree = await runner.runSchematicAsync('atomic-component', options, tree).toPromise();
        expectedFilePaths.forEach(path => expect(tree.files).toContain(path));

        const inputScss = tree.read('/projects/app2/src/app/_shared/components/example/example.component.scss').toString('utf-8');
        expect(inputScss.replace(/\s/g, '')).toEqual(`
          @use 'scoped-var/strict' as * with ($host: 'example');
          @use 'atomic/dialog' as *;

          :host {
            @include dialog($host);
          }
        `.replace(/\s/g, ''));
      });
    });
  });

  describe('Nx Workspace', () => {
    beforeEach(async () => {
      tree = await createNxWorkspace(runner, tree);
    });

    xit('', async () => {
      const options = {project: 'app', name: '_shared/components/extras/example'};
      // const options = {project: 'app', path: '_shared/components/extras', name: 'example'};
      const { files } = await runner.runSchematicAsync('atomic-component', options, tree).toPromise();
      expect(files).toContain('/apps/app/src/app/_shared/components/extras/example/example.module.ts');
    });
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
    
    const host = await runner.runSchematicAsync('atom', options, tree).toPromise();
    expectedFilePaths.forEach(path => expect(host.files.includes(path)).toBeTruthy());

    const inputTs = host.read('/projects/app/src/app/_shared/components/example/example.atom.ts').toString('utf-8');
    const expectedTs = readFileSync(join(__dirname, '_test/example.atom.ts')).toString();
    expect(inputTs.replace(/\s/g, '')).toEqual(expectedTs.replace(/\s/g, ''));

    const inputScss = host.read('/projects/app/src/app/_shared/components/example/example.atom.scss').toString('utf-8');
    const expectedScss = readFileSync(join(__dirname, '_test/example.atom.scss')).toString();
    expect(inputScss.replace(/\s/g, '')).toEqual(expectedScss.replace(/\s/g, ''));
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
