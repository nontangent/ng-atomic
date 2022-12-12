import { Rule, Tree } from '@angular-devkit/schematics';
import { join } from 'path';
import { SchematicsX } from '../../core/schematics-x';
import { BaseSchema } from '../base-schema';
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
  const path = options.path ?? '.';

  const schematicsX = new SchematicsX();
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
