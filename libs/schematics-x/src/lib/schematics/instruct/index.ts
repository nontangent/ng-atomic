import { Rule, Tree, chain, DirEntry } from '@angular-devkit/schematics';
import { createDefaultPath } from '@schematics/angular/utility/workspace';
import { join } from 'path';
import { SchematicsX } from '../../core/schematics-x';

interface Schema {
  path: string;
  project: string;
  
  inputs?: string;
  instructions: string;
  outputSize?: number;
}

export const instruct = (options: Schema): Rule => async (tree: Tree) => {
	options.path = await resolvePath(tree, options);
  
  const filePaths = getFilePaths(tree, options.path, options.inputs);
  const schematicsX = new SchematicsX();
  const entries = await schematicsX.instruct(options.instructions, filePaths.map(file => tree.get(file), options.outputSize));

  for (const entry of entries) {
    if (!tree.exists(entry.path)) {
      tree.create(entry.path, entry.content);
    }
  }

	return chain([]);
};

const isAncestor = (dir: string, path: string) => dir.split('/').every((p, i) => p === path.split('/')[i]);

function getFilePaths(tree: Tree, path: string = '/', inputs?: string): string[] {
  const dir = tree.getDir(path);
  let filePaths = getFiles(dir).map(p => join(path, p));

  if (inputs) {
    const dirArr = inputs.split(',').map(input => join(path, input));
    filePaths = filePaths.filter(path => dirArr.some(dir => isAncestor(dir, path)));
  }
  return filePaths;
}

async function resolvePath(tree, options: {project?: string, path?: string}): Promise<string> {
  const defaultPath = await createDefaultPath(tree, options.project);
  return join(defaultPath, options?.path ?? '');
}

function getFiles(dir: DirEntry): string[] {
  const files: string[] = [];
  walkDir(dir, (path, entry) => entry.subfiles.forEach(file => files.push(`${path}/${file}`)));
  return files;
}

function walkDir(dir: DirEntry, callback: (path: string, entry: DirEntry) => void, parent = '/') {
  dir.subdirs.forEach(path => {
    const entry = dir.dir(path);
    callback(join(parent, path), entry);
    walkDir(entry, callback, join(parent, path));
  });
}