import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { COLLECTION_PATH, createWorkspace } from '../_testing';

describe('Pages Schematics', () => {
  const runner = new SchematicTestRunner('@ng-atomic/schematics', COLLECTION_PATH);
  let tree: UnitTestTree;

  beforeEach(async () => {
    tree = await createWorkspace(runner, tree);
  });

  it('should create component files', async () => {
    const options = {project: 'app', name: 'pages'};
    const { files } = await runner.runSchematicAsync('pages', options, tree).toPromise();
    expect(files.includes('/projects/app/src/app/pages/pages.module.ts')).toBeTruthy();
  });
});
