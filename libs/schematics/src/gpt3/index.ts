import { Rule, Tree, chain, DirEntry, FileEntry } from '@angular-devkit/schematics';
import { Schema } from '../atomic-component/schema';
import { createDefaultPath } from '@schematics/angular/utility/workspace';
import { join } from 'path';
import { SchematicsX } from './schematics-x';


export function getFilePaths(tree: Tree, path: string = '/'): string[] {
  return getFiles(tree.getDir(path)).map(p => join(path, p));
}

export async function resolvePath(tree, options: {project?: string, path?: string}): Promise<string> {
  const defaultPath = await createDefaultPath(tree, options.project);
  return join(defaultPath, options?.path ?? '');
}

export const gpt3 = (options: Schema): Rule => async (tree: Tree) => {
	options.path = await resolvePath(tree, options);
  
  const files = getFilePaths(tree, options.path);
  const path = join(tree.root.path, options.path, options.name);
  const schematicsX = new SchematicsX();
  const entries = await schematicsX.generate(files.map(file => tree.get(file)), path);

  for (const entry of entries) {
    if (!tree.exists(entry.path)) {
      tree.create(entry.path, entry.content);
    }
  }

	return chain([]);
};

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