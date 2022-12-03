import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import path from 'path';
import { createWorkspace } from '../../_testing';

jest.setTimeout(300 * 1000);

const COLLECTION_PATH = path.join(__dirname, '../../../../collection.json');

describe('Directory Schematic', () => {
  const runner = new SchematicTestRunner('schematics-x', COLLECTION_PATH);
  let tree: UnitTestTree;

  describe('Angular Workspace', () => {
    beforeEach(async () => {
      tree = await createWorkspace(runner, tree);
      tree = await runner.runExternalSchematicAsync('@ng-atomic/schematics/../collection.json', 'atomic-component', {
        project: 'app', path: '_shared/components', name: 'example'
      }, tree).toPromise();

      tree = await runner.runExternalSchematicAsync('@ng-atomic/schematics/../collection.json', 'atomic-component', {
        project: 'app', path: '_shared/components', name: 'test'
      }, tree).toPromise();

      expect(tree.files).toContain('/projects/app/src/app/_shared/components/example/example.module.ts');
      expect(tree.files).toContain('/projects/app/src/app/_shared/components/example/example.component.html');
      expect(tree.files).toContain('/projects/app/src/app/_shared/components/example/example.component.scss');
      expect(tree.files).toContain('/projects/app/src/app/_shared/components/example/example.component.spec.ts');
      expect(tree.files).toContain('/projects/app/src/app/_shared/components/example/example.component.ts');
      expect(tree.files).toContain('/projects/app/src/app/_shared/components/example/example.stories.ts');
      expect(tree.files).toContain('/projects/app/src/app/_shared/components/example/index.ts');
      expect(tree.files).toContain('/projects/app/src/app/_shared/components/test/test.module.ts');
      expect(tree.files).toContain('/projects/app/src/app/_shared/components/test/test.component.html');
      expect(tree.files).toContain('/projects/app/src/app/_shared/components/test/test.component.scss');
      expect(tree.files).toContain('/projects/app/src/app/_shared/components/test/test.component.spec.ts');
      expect(tree.files).toContain('/projects/app/src/app/_shared/components/test/test.component.ts');
      expect(tree.files).toContain('/projects/app/src/app/_shared/components/test/test.stories.ts');
      expect(tree.files).toContain('/projects/app/src/app/_shared/components/test/index.ts');
    });

    it('should create atomic component files', async () => {
      tree = await runner.runSchematicAsync('directory', {
        project: 'app', path: '', name: '_shared/components/expected'
      }, tree).toPromise();
      expect(tree.files).toContain('/projects/app/src/app/_shared/components/expected/expected.module.ts');
      expect(tree.files).toContain('/projects/app/src/app/_shared/components/expected/expected.component.html');
      expect(tree.files).toContain('/projects/app/src/app/_shared/components/expected/expected.component.scss');
      expect(tree.files).toContain('/projects/app/src/app/_shared/components/expected/expected.component.spec.ts');
      expect(tree.files).toContain('/projects/app/src/app/_shared/components/expected/expected.component.ts');
      expect(tree.files).toContain('/projects/app/src/app/_shared/components/expected/expected.stories.ts');
      expect(tree.files).toContain('/projects/app/src/app/_shared/components/expected/index.ts');
    });

  });
});
