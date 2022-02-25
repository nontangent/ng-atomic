import type { } from 'wicg-file-system-access';
import { walk } from '../utils/walk';
import { get, set, entries } from 'idb-keyval';

export class FileService {
  private fileHandleMap = new Map<string, FileSystemFileHandle>();

  get isLoaded(): boolean {
    return !!this.fileHandleMap.size;
  }

  async loadFileHandleMapFromIndexedDB() {
    const handle: FileSystemDirectoryHandle = await get('dirHandle');
    if (!handle) return null;

    const options = {mode: 'readwrite'} as any;

    if ((await handle.queryPermission(options)) === 'granted') {
      await this.loadProject(handle);
    } else if ((await handle.requestPermission(options)) === 'granted') {
      await this.loadProject(handle);
    }
  }

  async loadFileHandleMapByPicker(): Promise<void> {
    const handle = await window.showDirectoryPicker();
    await set('dirHandle', handle);
    await this.loadProject(handle);
  }

  async loadProject(handle: FileSystemDirectoryHandle): Promise<void> {
    await walk(handle, (key, handle) => this.fileHandleMap.set(key, handle));
    console.debug('this.filehandleMap:', this.fileHandleMap);
  }

  async loadFileText(path: string): Promise<string> {
    console.debug('path:', path);
    const handle = this.fileHandleMap.get(path);
    console.debug('handle:', handle);
    const file = await handle.getFile();
    return file.text();
  }

  async overwrite(path: string, contents: string): Promise<void> {
    const handle = this.fileHandleMap.get(path);
    const writable = await (handle as FileSystemFileHandle).createWritable();

    await writable.write(contents);
    await writable.close();
  }
}
