import { Rule, Tree } from '@angular-devkit/schematics';
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

export const auto = (options: Schema): Rule => async (tree: Tree) => {
	let path: string = '/';
  try {
    path = await resolvePath(tree, options);
  } catch { }
  options.parallel = false;

  const filePaths = getFilePaths(tree, path, options.inputs)
    .filter(path => path.split('/').length - 1 < 4);

  const targetPath = join(tree.root.path, path, options.name);
  const schematicsX = new SchematicsX({parallel: options.parallel});
  const entries = await schematicsX.generateAuto(targetPath, filePaths.map(file => tree.get(file)));

	return updateTree(entries, options.overwrite);
};
