import * as monaco from 'monaco-editor';
import { ReplaySubject } from 'rxjs';
import { FileService } from './file.service';

export class ModelsService {
  private static _instance: ModelsService;
  static get instance(): ModelsService {
    return (this._instance ??= new ModelsService());
  }

  constructor() {
    monaco.editor.createModel(
      'export default { a: 1 }',
      'typescript',
      monaco.Uri.from({
        scheme: 'file',
        path: '/foo.ts',
      })
    );

    const model = monaco.editor.createModel(
      'import * as foo from "./foo";\nconsole.log(foo)',
      'typescript',
      monaco.Uri.from({
        scheme: 'file',
        path: '/index.ts',
      })
    );
    this._models.push(model);
  }

  private _models: monaco.editor.ITextModel[] = [];

  get models(): monaco.editor.ITextModel[] {
    return this._models;
  }

  addModel(path: string, text: string) {
    if (!monaco) return;
    path = path.startsWith('./') ? path.slice(1) : path;
    const uri = monaco.Uri.from({ scheme: 'file', path });
    const model = monaco.editor.createModel(text, 'typescript', uri);
    this._models.push(model);
  }
}

export class EditorService {
  private static _instance: EditorService;
  static get instance(): EditorService {
    return (this._instance ??= new EditorService());
  }

  readonly refresh$ = new ReplaySubject(1);
  private fileService = FileService.instance;

  models$ = new ReplaySubject<monaco.editor.ITextModel[]>();

  constructor() // private fileService = FileService.instance,
  // private modelService = ModelsService.instance,
  {}

  async loadFiles() {
    console.debug('this.fileService:', this.fileService);
    console.debug('FileService.instance:', FileService.instance);
    await FileService.instance.loadFileHandleMapFromIndexedDB();
    await this.loadModels();
  }

  async loadModels() {
    const promises = [...FileService.instance.fileHandleMap.entries()]
      .filter(([path]) => !!path?.match(/(ts|tsx)$/))
      .filter(([path]) => path.includes('select-input-field'))
      .map(([path, handle]) =>
        handle
          .getFile()
          .then((file) => file.text())
          .then((text) => [path, text])
      );
    const files = await Promise.all(promises);
    for (const [path, text] of files) {
      ModelsService.instance.addModel(path, text);
    }
    this.models$.next(ModelsService.instance.models);
  }
}
