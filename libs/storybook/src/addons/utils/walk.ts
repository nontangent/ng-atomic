export type WalkCallback = (key: string, handle: FileSystemFileHandle) => void;

export async function walk(
  dirHandle: FileSystemDirectoryHandle,
  callback: WalkCallback,
  cwd: string = '.'
) {
  const entries = await toArray(dirHandle.entries());
  await Promise.all(
    entries.map(([key, entry]) => {
      if (cwd === '.' && key !== 'libs') return;
      return entry.kind === 'directory'
        ? walk(entry, callback, `${cwd}/${entry.name}`)
        : callback(`${cwd}/${key}`, entry);
    })
  );
}

async function toArray<T>(
  asyncIterator: AsyncIterableIterator<T>
): Promise<T[]> {
  const arr = [];
  for await (const i of asyncIterator) arr.push(i);
  return arr;
}
