import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { readFileSync } from 'fs';
import path from 'path';
import { join } from 'path';
import { createWorkspace } from '../_testing';

const COLLECTION_PATH = path.join(__dirname, '../../collection.json');

describe('StyleHeader', () => {
  const runner = new SchematicTestRunner('@ng-atomic/schematics', COLLECTION_PATH);
  let tree: UnitTestTree;

  beforeEach(async () => {
    tree = await createWorkspace(runner, tree);
    const options = {project: 'app', style: 'scss', name: 'example', skipImport: true };
    tree = await runner.runExternalSchematicAsync('@schematics/angular', 'component', options, tree).toPromise();
  });

  describe('given all options', () => {
    it('should be added style header', async () => {
      const PATH = '/projects/app/src/app/example/example.component.scss';
      const options = {path: PATH, name: 'example', type: 'component'};
  
      await runner.runSchematicAsync('style-header', options, tree).toPromise();
      const input = tree.read(PATH).toString('utf-8');
      const expected = readFileSync(join(__dirname, '_test/example.scss')).toString();
      expect(input.replace(/\s/g, '')).toEqual(expected.replace(/\s/g, ''));
    });
  });

  describe('given only options.path', () => {
    it('should be added style header', async () => {
      const PATH = '/projects/app/src/app/example/example.component.scss';
      const options = {path: PATH};
  
      await runner.runSchematicAsync('style-header', options, tree).toPromise();
      const input = tree.read(PATH).toString('utf-8');
      const expected = readFileSync(join(__dirname, '_test/example.scss')).toString();
      expect(input.replace(/\s/g, '')).toEqual(expected.replace(/\s/g, ''));
    });
  });

});
