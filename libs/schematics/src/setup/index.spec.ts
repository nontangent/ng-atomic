import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { COLLECTION_PATH, createWorkspace } from '../_testing';
import { get } from 'lodash';

describe('Setup Schematics', () => {
  const runner = new SchematicTestRunner('@ng-atomic/schematics', COLLECTION_PATH);
  let tree: UnitTestTree;

  beforeEach(async () => {
    tree = await createWorkspace(runner, tree);
  });

  it('should create component files', async () => {
    const options = {project: 'app', name: 'pages'};
    const host = await runner.runSchematicAsync('setup', options, tree).toPromise();
    const angularJson = JSON.parse(host.read('/angular.json').toString('utf-8'));
    expect(get(angularJson, 'cli.defaultCollection')).toEqual('@ng-atomic/schematics');
    const schematicsJson = get(angularJson, 'projects.app.schematics');

    for (const type of ['atom', 'molecule', 'organism', 'template']) {
      expect(get(schematicsJson, `@ng-atomic/schematics:${type}`))
        .toEqual({path: `_shared/components/${type}s`});
    }

    const architectJson = get(angularJson, 'projects.app.architect');
    expect(get(architectJson, 'build.options.stylePreprocessorOptions.includePaths'))
      .toContain('src/styles');

    for (const type of ['component', 'atom', 'molecule', 'organism', 'template', 'page']) {
      expect(host.files).toContain(`/src/styles/atomic/_${type}.scss`);
    }

    const tsconfigJson = JSON.parse(host.read('/tsconfig.json').toString('utf-8'));
    expect(get(tsconfigJson, 'compilerOptions.paths.@components')).toContain('_shared/components');
    expect(get(tsconfigJson, 'compilerOptions.paths.@components/*')).toContain('_shared/components/*');
  });
});
