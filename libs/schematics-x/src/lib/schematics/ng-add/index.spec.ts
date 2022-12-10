import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import path from 'path';
import { createWorkspace, createNxWorkspace } from '../../_testing';

jest.setTimeout(300 * 1000);

const COLLECTION_PATH = path.join(__dirname, '../../../../collection.json');

describe('ngAdd', () => {
  const runner = new SchematicTestRunner('schematics-x', COLLECTION_PATH);
  let tree: UnitTestTree;

  describe('Angular Workspace', () => {
    beforeEach(async () => {
      tree = await createWorkspace(runner, tree);
    });

    xit('should set default collection', async () => {
      tree = await runner.runSchematicAsync('ng-add', {
        collectionName: 'schematics-x'
      }, tree).toPromise();
      expect(tree.files).toContain('/angular.json');
      expect(tree.readJson('/angular.json')['cli']['defaultCollection']).toEqual('schematics-x');
      // expect(tree.readJson('/package.json')['devDependencies']['schematics-x']).toBeTruthy();
    });
  });

  describe('Nx Workspace', () => {
    beforeEach(async () => {
      tree = await createNxWorkspace(runner, tree);
    });

    it('should set default collection', async () => {
      tree = await runner.runSchematicAsync('ng-add', {
        collectionName: 'schematics-x'
      }, tree).toPromise();
      expect(tree.files).toContain('/nx.json');
      expect(tree.readJson('/nx.json')['cli']['defaultCollection']).toEqual('schematics-x');
      // expect(tree.readJson('/package.json')['devDependencies']['schematics-x']).toBeTruthy();
    });
  });
});
