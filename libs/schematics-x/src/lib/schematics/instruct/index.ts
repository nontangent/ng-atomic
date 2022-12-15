import { Rule, Tree } from '@angular-devkit/schematics';
import { join } from 'path';
import { SchematicsX, SchematicsXModule } from '../../core/schematics-x';
import { BaseSchema } from '../base-schema';
import { getRootInjector } from '../injector';
import { tryToCreateDefaultPath, updateTree } from '../utils';

export interface InstructSchema extends BaseSchema {
  instructions: string;

  scope: string;
  inputScope?: string;
  outputScope?: string;

  targets?: string;
  inputs?: string;
  outputs?: string;
}

export const instruct = (options: InstructSchema): Rule => async (tree: Tree) => {
	const projectDefaultPath = await tryToCreateDefaultPath(tree, options.project);
  process.env['SX_VERBOSE_LOGGING'] && console.debug('projectDefaultPath', projectDefaultPath)
  const path = options.path ?? '.';

  const injector = getRootInjector([SchematicsXModule.forRoot()]);
  const schematicsX = injector.get(SchematicsX);

  const entries = await schematicsX.execute(tree, {
    inputScope: join(projectDefaultPath, path, options.inputScope ?? options.scope),
    outputScope: join(projectDefaultPath, path, options.outputScope ?? options.scope),
    instructions: options.instructions,
    inputFilePaths: (options.inputs ?? options.targets)?.split(',')
      .map(filePath => join(projectDefaultPath, path, filePath)),
    outputFilePaths: (options.outputs ?? options.targets)?.split(',')
      .map(filePath => join(projectDefaultPath, path, filePath)),
    parallel: options.parallel,
  });
	return updateTree(entries, !!options.targets || options.overwrite);
};
