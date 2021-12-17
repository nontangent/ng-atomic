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
    const options = {project: 'app', name: 'test'};
    const host = await runner.runSchematicAsync('page', options, tree).toPromise();
    expect(host.files.includes('/projects/app/src/app/pages/pages.module.ts')).toBeTruthy();
    expect(host.files.includes('/projects/app/src/app/pages/test/test.module.ts')).toBeTruthy();
    expect(host.files.includes('/projects/app/src/app/pages/test/test.page.html')).toBeTruthy();
    expect(host.files.includes('/projects/app/src/app/pages/test/test.page.scss')).toBeTruthy();
    expect(host.files.includes('/projects/app/src/app/pages/test/test.page.spec.ts')).toBeTruthy();
    expect(host.files.includes('/projects/app/src/app/pages/test/test.page.ts')).toBeTruthy();

    const input = host.read('/projects/app/src/app/pages/test/test.module.ts').toString('utf-8');
    const expected = readFileSync(join(__dirname, '_test/test.module.ts.expected')).toString('utf-8');
    expect(input.replace(/\s/g, '')).toEqual(expected.replace(/\s/g, ''));
    
  });
});
