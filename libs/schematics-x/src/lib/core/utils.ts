import { DirEntry } from "@angular-devkit/schematics";
import { join, parse } from "path";

export const hasExt = (path: string): boolean => !!parse(path).ext.length;
export const getDepth = (path: string): number => path.split('/').length;
export function getFiles(dir: DirEntry): string[] {
  const files: string[] = [...dir.subfiles];
  walkDir(dir, (path, entry) => entry.subfiles.forEach(file => files.push(`${path}/${file}`)));
  return files;
}

export function walkDir(dir: DirEntry, callback: (path: string, entry: DirEntry) => void, parent = '/') {
  dir.subdirs.forEach(path => {
    const entry = dir.dir(path);
    callback(join(parent, path), entry);
    walkDir(entry, callback, join(parent, path));
  });
}

export function sleep(seconds: number) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

export async function promiseAllOrForLoop<T>(promises: (() => Promise<T>)[], parallel = false, interval = 10): Promise<T[]> {
  if (parallel) return Promise.all(promises.map(promise => promise()));
  const results: T[] = [];
  for (const promise of promises) {
    await sleep(interval);
    results.push(await promise());
  }
  return results;
}