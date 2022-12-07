import { Rule, Tree } from '@angular-devkit/schematics';
import { join } from 'path';
import { SchematicsX } from '../../core-v2/schematics-x';
import { BaseSchema } from '../base-schema';
import { tryResolveBasePath, updateTree } from '../utils';

interface Schema extends BaseSchema {
  instructions: string;
  inputScope: string;
  outputScope: string;

  inputs?: string;
  outputs?: string;
}

export const instruct = (options: Schema): Rule => async (tree: Tree) => {
	const projectBasePath = await tryResolveBasePath(tree, options.project, options.path);
  const schematicsX = new SchematicsX();
  const entries = await schematicsX.execute(tree, {
    inputScope: join(projectBasePath, options.inputScope),
    outputScope: join(projectBasePath, options.outputScope),
    instructions: options.instructions,
    inputFilePaths: options.inputs?.split(',').map(filePath => join(projectBasePath, filePath)),
    outputFilePaths: options.outputs?.split(',').map(filePath => join(projectBasePath, filePath)),
    parallel: options.parallel,
  });
	return updateTree(entries, options.overwrite);
};
