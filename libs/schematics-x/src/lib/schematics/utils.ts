import { createDefaultPath } from '@schematics/angular/utility/workspace';
import { DirEntry, FileEntry, Rule, Tree } from "@angular-devkit/schematics";
import { join } from "path";
import { getFiles } from '../core/utils';

const isAncestor = (dir: string, path: string) => dir.split('/').every((p, i) => p === path.split('/')[i]);

export function getFilePaths(tree: Tree, path: string = '/', inputs?: string): string[] {
  const dir = tree.getDir(path);
  let filePaths = getFiles(dir).map(p => join(path, p));

  if (inputs) {
    const dirArr = inputs.split(',').map(input => join(path, input));
    filePaths = filePaths.filter(path => dirArr.some(dir => isAncestor(dir, path)));
  }
  return filePaths;
}

export async function tryResolveBasePath(tree: Tree, project: string, path: string, fallback = '/'): Promise<string> {
  try {
    return await resolvePath(tree, { project, path });
  } catch {
    return fallback;
  }
}

export async function resolvePath(tree: Tree, options: {project?: string, path?: string}): Promise<string> {
  const defaultPath = await createDefaultPath(tree, options.project);
  return join(defaultPath, options?.path ?? '');
}

export function updateTree(entries: FileEntry[], overwrite = false): Rule {
  return (tree) => entries.forEach(entry => {
    if (!tree.exists(entry.path)) {
      tree.create(entry.path, entry.content);
    } else {
      if (overwrite) {
        tree.overwrite(entry.path, entry.content);
      } else {
        console.warn(`Cancelled to overwrite \`${entry.path}\`. If you want to overwrite, set \`--overwrite\` option.`);
      }
    }
  });
}