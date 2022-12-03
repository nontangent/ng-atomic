import { Rule, Tree, schematic, chain } from '@angular-devkit/schematics';
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
	const path = await resolvePath(tree, options);
  
  const filePaths = getFilePaths(tree, path, options.inputs);
  const targetPath = join(path, options.name);
  const schematicsX = new SchematicsX();
  const files = schematicsX.getSimilarFilePaths(targetPath, filePaths.map(file => tree.get(file)));

	return chain([
    schematic('instruct', {
      project: options.project,
      path: options.path,
      instructions: schematicsX.buildFileContentEstimateInstructions(targetPath),
      outputSize: 1,
      inputs: files.map(file => file.path.replace(path, '')).join(','),
    }),
  ]);
};
