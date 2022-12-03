import { Rule, Tree } from '@angular-devkit/schematics';
import { SchematicsX } from '../../core/schematics-x';
import { getFilePaths, resolvePath, updateTree } from '../utils';

interface Schema {
  path: string;
  project: string;
  
  inputs?: string;
  instructions: string;
  outputSize?: number;
}

export const instruct = (options: Schema): Rule => async (tree: Tree) => {
	const path = await resolvePath(tree, options);
  const filePaths = getFilePaths(tree, path, options.inputs);
  const schematicsX = new SchematicsX();
  const entries = await schematicsX.instruct(options.instructions, filePaths.map(file => tree.get(file)), options.outputSize);
	return updateTree(entries);
};
