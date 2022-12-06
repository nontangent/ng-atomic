import { Rule, Tree } from '@angular-devkit/schematics';
import { join } from 'path';
import { DirectoryAdaptor } from '../../core-v2/adaptors';
import { SchematicsX } from '../../core-v2/schematics-x';
import { BaseSchema } from '../base-schema';
import { tryResolveBasePath, updateTree } from '../utils';

interface Schema extends BaseSchema {
  path: string;
  name: string;
  inputScope: string;
  outputScope: string;
  
  inputs?: string;
}

export const directory = (options: Schema): Rule => async (tree: Tree) => {
	const projectBasePath = await tryResolveBasePath(tree, options.project, options.path);
  const schematicsX = new SchematicsX();
  const entries = await schematicsX.execute(tree, DirectoryAdaptor.options({
    dirPath: options.path,
    inputScope: join(projectBasePath, options.inputScope),
    outputScope: join(projectBasePath, options.outputScope),
  }));
	return updateTree(entries, options.overwrite);
};
