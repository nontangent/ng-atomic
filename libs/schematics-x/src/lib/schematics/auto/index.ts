import { Rule, Tree } from '@angular-devkit/schematics';
import { join } from 'path';
import { AutoAdaptor } from '../../core-v2/adaptors';
import { SchematicsX } from '../../core-v2/schematics-x';
import { BaseSchema } from '../base-schema';
import { tryResolveBasePath, updateTree } from '../utils';


interface Schema extends BaseSchema {
  path: string;
  name: string;
  inputScope: string;
  outputScope: string;

  inputs?: string;
  outputs?: string;
}

export const auto = (options: Schema): Rule => async (tree: Tree) => {
	const projectBasePath = await tryResolveBasePath(tree, options.project, options.path);
  const schematicsX = new SchematicsX();
  const entries = await schematicsX.execute(tree, AutoAdaptor.options({
    path: options.path,
    inputScope: join(projectBasePath, options.inputScope),
    outputScope: join(projectBasePath, options.outputScope),
  }));
	return updateTree(entries, options.overwrite);
};
