import { Rule, Tree, chain, schematic } from '@angular-devkit/schematics';
import { join } from 'path';
import { SchematicsX } from '../../core/schematics-x';
import { getFilePaths, resolvePath } from '../utils';

interface Schema {
  path: string;
  inputs?: string;
  name: string;
  project: string;
}

export const directory = (options: Schema): Rule => async (tree: Tree) => {
	options.path = await resolvePath(tree, options);
  
  const filePaths = getFilePaths(tree, options.path, options.inputs);
  const path = join(tree.root.path, options.path, options.name);
  const schematicsX = new SchematicsX();
  const generateFilePaths = await schematicsX.buildFilePaths(filePaths, path);

  console.debug('generateFilePaths', generateFilePaths);
  
	return chain(generateFilePaths.map(path => schematic('schematics-x:file', {
    name: path,
    path: options.path,
    project: options.project,
    inputs: options.inputs,
  })));
};
