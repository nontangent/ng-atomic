import { createDefaultPath } from '@schematics/angular/utility/workspace';
import { FileEntry, Rule, Tree } from "@angular-devkit/schematics";
import { join } from "path";
import { getFiles } from '../core/helpers/utils';

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

export async function tryToCreateDefaultPath(tree: Tree, project: string, fallback = '/'): Promise<string> {
  try {
    return await createDefaultPath(tree, project);
  } catch {
    return fallback;
  }
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
