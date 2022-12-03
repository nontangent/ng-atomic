import { Rule, Tree, chain } from '@angular-devkit/schematics';
import { join } from 'path';
import { SchematicsX } from '../../core/schematics-x';
import { getFilePaths, resolvePath, updateTree } from '../utils';

interface Schema {
  path: string;
  inputs?: string;
  name: string;
  project: string;
  parallel: boolean;
  overwrite: boolean;
}

export const directory = (options: Schema): Rule => async (tree: Tree) => {
	const path = await resolvePath(tree, options);
  const filePaths = getFilePaths(tree, path, options.inputs);
  const targetPath = join(tree.root.path, path, options.name);

  const schematicsX = new SchematicsX({parallel: options.parallel});
  const entries = await schematicsX.generateDirectory(targetPath, filePaths.map(file => tree.get(file)));
  
	return updateTree(entries, options.overwrite);
};
