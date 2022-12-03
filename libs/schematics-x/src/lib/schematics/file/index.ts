import { Rule, Tree } from '@angular-devkit/schematics';
import { join } from 'path';
import { SchematicsX } from '../../core/schematics-x';
import { getFilePaths, resolvePath, updateTree } from '../utils';

interface Schema {
  name: string;
  path: string;
  project: string;
  inputs?: string;
  outputSize?: number;
  parallel: boolean;
  overwrite: boolean;
}

export const file = (options: Schema): Rule => async (tree: Tree) => {
	const path = await resolvePath(tree, options);  
  const filePaths = getFilePaths(tree, path, options.inputs);
  const targetPath = join(tree.root.path, path, options.name);
  const schematicsX = new SchematicsX({parallel: options.parallel});
  const entry = await schematicsX.generateFile(targetPath, filePaths.map(file => tree.get(file)));

  return updateTree([entry], options.overwrite);
};
