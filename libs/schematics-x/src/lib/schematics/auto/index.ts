import { Rule, Tree } from '@angular-devkit/schematics';
import { join } from 'path';
import { SchematicsX } from '../../core/schematics-x';
import { getFilePaths, resolvePath, updateTree } from '../utils';

interface Schema {
  path: string;
  inputs?: string;
  name: string;
  project: string;
}

export const auto = (options: Schema): Rule => async (tree: Tree) => {
	options.path = await resolvePath(tree, options);
  
  const filePaths = getFilePaths(tree, options.path, options.inputs);
  const path = join(tree.root.path, options.path, options.name);
  const schematicsX = new SchematicsX();
  const entries = await schematicsX.generateAuto(path, filePaths.map(file => tree.get(file)));

	return updateTree(entries);
};
