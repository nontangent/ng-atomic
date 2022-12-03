import { Rule, Tree, schematic } from '@angular-devkit/schematics';
import { join } from 'path';
import { SchematicsX } from '../../core/schematics-x';
import { getFilePaths, resolvePath } from '../utils';

interface Schema {
  name: string;
  path: string;
  project: string;
  inputs?: string;
  outputSize?: number;
}

export const file = (options: Schema): Rule => async (tree: Tree) => {
	options.path = await resolvePath(tree, options);
  
  const filePaths = getFilePaths(tree, options.path, options.inputs);
  const targetPath = join(options.path, options.name);
  const schematicsX = new SchematicsX();
  const files = schematicsX.getSimilarFilePaths(targetPath, filePaths.map(file => tree.get(file)));

	return schematic('schematics-x:instruct', {
    instructions: schematicsX.buildFileContentEstimateInstructions(targetPath),
    outputSize: 1,
    inputs: files.map(file => file.path).join(','),
  });
};
