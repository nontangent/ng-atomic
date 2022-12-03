import { Rule, Tree } from '@angular-devkit/schematics';
import { SchematicsX } from '../../core/schematics-x';
import { getFilePaths, resolvePath } from '../utils';

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

	return tree => entries.forEach(entry => {
    if (!tree.exists(entry.path)) {
      tree.create(entry.path, entry.content);
    } else {
      // tree.overwrite(entry.path, entry.content);
    }
  })
};
