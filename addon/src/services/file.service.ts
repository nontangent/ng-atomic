import { useStorybookApi } from '@storybook/api';
import { isMetaKey } from '../utils';
import type {} from 'wicg-file-system-access';
import { walk } from '../utils/walk';
import { get, set } from 'idb-keyval';
import { fromEvent, ReplaySubject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

type FileHandleMap = Map<string, FileSystemFileHandle>;

export class FileService {
  private _fileHandleMap: FileHandleMap = new Map();

  static _instance: FileService;
  static get instance(): FileService {
    this._instance ??= new FileService();
    return this._instance;
  }

  refresh$ = new ReplaySubject(1);

  saveKeyDown$ = fromEvent<Event & { key: string }>(document, 'keydown').pipe(
    filter((e) => isMetaKey(e) && e.key === 's'),
    tap((e) => e.preventDefault())
  );

  get isLoaded(): boolean {
    return !!this._fileHandleMap.size;
  }

  get fileHandleMap(): FileHandleMap {
    return this._fileHandleMap;
  }

  async loadFileHandleMapFromIndexedDB() {
    const handle: FileSystemDirectoryHandle = await get('dirHandle');
    if (!handle) return null;

    const options = { mode: 'readwrite' } as any;

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
    await walk(handle, (key, handle) => this._fileHandleMap.set(key, handle));
  }

  async loadFileText(path: string | RegExp): Promise<string> {
    const handle =
      typeof path === 'string'
        ? this._fileHandleMap.get(path)
        : this.matchPath(path);
    const file = await handle.getFile();
    return file.text();
  }

  private matchPath(regExp: RegExp): FileSystemFileHandle {
    return [...this._fileHandleMap.entries()].find(
      ([key]) => !!key.match(regExp)
    )?.[1];
  }

  async overwrite(path: string, contents: string): Promise<void> {
    const handle = this._fileHandleMap.get(path);
    const writable = await (handle as FileSystemFileHandle).createWritable();

    await writable.write(contents);
    await writable.close();
  }
}
