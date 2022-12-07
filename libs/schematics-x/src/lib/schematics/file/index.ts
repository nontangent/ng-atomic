import { Rule, schematic, Tree } from '@angular-devkit/schematics';
import { join } from 'path';
import { FileAdaptor } from '../../core-v2/adaptors';
import { SchematicsX } from '../../core-v2/schematics-x';
import { BaseSchema } from '../base-schema';
import { tryResolveBasePath, updateTree } from '../utils';

interface Schema extends BaseSchema {
  name: string;
  inputScope: string;
  inputs?: string;
}

export const file = (options: Schema): Rule => async (tree: Tree) => {
	const projectBasePath = await tryResolveBasePath(tree, options.project, options.path);
  const schematicsX = new SchematicsX();
  const entries = await schematicsX.execute(tree, FileAdaptor.options({
    filePath: options.path,
    inputScope: join(projectBasePath, options.inputScope),
  }));
	return updateTree(entries, options.overwrite);
};
