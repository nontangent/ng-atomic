import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { readFileSync } from 'fs';
import { join } from 'path';
import { COLLECTION_PATH, createWorkspace } from '../_testing';

describe('Page Schematics', () => {
  const runner = new SchematicTestRunner('@ng-atomic/schematics', COLLECTION_PATH);
  let tree: UnitTestTree;

  beforeEach(async () => {
    tree = await createWorkspace(runner, tree);
  });

  it('should create atomic component files', async () => {
    const options = {project: 'app', name: 'example'};
    const host = await runner.runSchematicAsync('page', options, tree).toPromise();
    expect(host.files.includes('/projects/app/src/app/pages/pages.module.ts')).toBeTruthy();
    expect(host.files.includes('/projects/app/src/app/pages/example/example.module.ts')).toBeTruthy();
    expect(host.files.includes('/projects/app/src/app/pages/example/example.page.html')).toBeTruthy();
    expect(host.files.includes('/projects/app/src/app/pages/example/example.page.scss')).toBeTruthy();
    expect(host.files.includes('/projects/app/src/app/pages/example/example.page.spec.ts')).toBeTruthy();
    expect(host.files.includes('/projects/app/src/app/pages/example/example.page.ts')).toBeTruthy();

    const inputModuleTs = host.read('/projects/app/src/app/pages/example/example.module.ts').toString('utf-8');
    const expectedModuleTs = readFileSync(join(__dirname, '_test/example.module.ts')).toString('utf-8');
    expect(inputModuleTs.replace(/\s/g, '')).toEqual(expectedModuleTs.replace(/\s/g, ''));

    const inputTs = host.read('/projects/app/src/app/pages/example/example.page.ts').toString('utf-8');
    const expectedTs = readFileSync(join(__dirname, '_test/example.page.ts')).toString('utf-8');
    expect(inputTs.replace(/\s/g, '')).toEqual(expectedTs.replace(/\s/g, ''));

    const inputScss = host.read('/projects/app/src/app/pages/example/example.page.scss').toString('utf-8');
    const expectedScss = readFileSync(join(__dirname, '_test/example.page.scss')).toString('utf-8');
    expect(inputScss.replace(/\s/g, '')).toEqual(expectedScss.replace(/\s/g, ''));
    
  });
});
