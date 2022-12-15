import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import path from 'path';
import { RootProviderService } from '../injector';
import { createWorkspace } from '../../_testing';
import { SchematicsX } from '../../core/schematics-x';
import { mockSchematicsX } from '../../core/schematics-x/testing/schematics-x.mock';

jest.setTimeout(300 * 1000);

const COLLECTION_PATH = path.join(__dirname, '../../../../collection.json');

describe('InstructSchematic', () => {
  const runner = new SchematicTestRunner('schematics-x', COLLECTION_PATH);
  let tree: UnitTestTree;

  describe('mockSchematicsX', () => {
    beforeAll(async () => {
      tree = await createWorkspace(runner, tree);

      RootProviderService.register([
        { provide: SchematicsX, useValue: mockSchematicsX },
      ]);
    });

    afterAll(() => {
      RootProviderService.clear();
    });

    it('should execute', async () => {
      mockSchematicsX.execute.mockResolvedValue([
        {
          path: '/projects/app/src/app/_shared/components/example/example.module.ts' as any,
          content: Buffer.from('test'),
        },
      ]);
      await runner.runSchematicAsync('instruct', {
        instructions: 'Generate a directory `_shared/components/expected`.',
        project: 'app', path: '', 
        inputScope: '_shared/components/example',
      }, tree).toPromise();
      expect(mockSchematicsX.execute).toBeCalled();
    });

  });

  xdescribe('Angular Workspace', () => {
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

    xit('should create atomic component files', async () => {
      tree = await runner.runSchematicAsync('instruct', {
        instructions: 'Create `_shared/components/expected/expected.module.ts` similar to input files:',
        project: 'app', path: '', 
        inputs: '_shared/components/example/example.module.ts',
      }, tree).toPromise();
      expect(tree.files).toContain('/projects/app/src/app/_shared/components/expected/expected.module.ts');
    });

    it('should create atomic component files', async () => {
      tree = await runner.runSchematicAsync('instruct', {
        instructions: 'Generate a directory `_shared/components/expected`.',
        project: 'app', path: '', 
        inputScope: '_shared/components/example',
      }, tree).toPromise();
      expect(tree.files).toContain('/projects/app/src/app/_shared/components/expected/expected.module.ts');
    });
  });
});
