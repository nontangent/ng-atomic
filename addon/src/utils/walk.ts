export type WalkCallback = (key: string, handle: FileSystemFileHandle) => void;

export async function walk(
  dirHandle: FileSystemDirectoryHandle,
  callback: WalkCallback,
  cwd: string = '.',
) {
  for await (const [key, entry] of dirHandle.entries()) {
    if (cwd === '.' && key !== 'libs') continue;

    if (entry.kind === 'directory') {
      await walk(entry, callback, `${cwd}/${entry.name}`);
    } else {
      callback(`${cwd}/${key}`, entry)
    }
  }
}
