import { createDefaultPath } from '@schematics/angular/utility/workspace';
import { DirEntry, FileEntry, Rule, Tree } from "@angular-devkit/schematics";
import { join } from "path";

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

export async function resolvePath(tree, options: {project?: string, path?: string}): Promise<string> {
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