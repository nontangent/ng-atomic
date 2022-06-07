import { API, Story } from '@storybook/api';
import React, { useState, useEffect, useRef } from 'react';
import { FileService } from '../services';
// import { Editor } from './editor.component';
import { FileMeta, parseFileName } from '../utils';
import { editor, Uri } from 'monaco-editor';
import * as monaco from 'monaco-editor';
import Editor, { useMonaco, loader } from '@monaco-editor/react';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EditorService, ModelsService } from '../services/editor.service';

interface State {
  dir?: string;
  name?: string;
  type?: string;
  ext?: string;
}

export type FileType =
  | 'component'
  | 'module'
  | 'template'
  | 'style'
  | 'stories';

interface Props {
  title: string;
  language: string;
  type: FileType;
  api?: API;
  fileService?: FileService;
}

const getExt = (type: FileType) => {
  switch (type) {
    case 'component':
      return 'ts';
    case 'module':
      return 'ts';
    case 'template':
      return 'html';
    case 'style':
      return 'scss';
    case 'stories':
      return 'ts';
  }
};

export class FilePathResolver {
  resolve({ dir, name, type }: Partial<FileMeta>) {
    const ext = getExt(type as FileType);
    if (new Set(['component', 'style', 'template']).has(type)) {
      return `${dir}/${name}.${getType(dir)}.${ext}`;
    }
    return `${dir}/${name}.${type}.${ext}`;
  }
}

const getType = (dir: string) => {
  return dir.match(/components\/(.+)\//)?.[1].slice(0, -1);
};

export const EditorContainer = (props: Props) => {
  const fileService = FileService.instance;
  const [language] = useState(props.language);
  const [type] = useState(props.type);
  const editorRef = useRef<editor.IStandaloneCodeEditor>(null);
  const resolver = new FilePathResolver();

  const buildFilePath = ({ type }): string => {
    const { dir, name } = getMeta();
    return resolver.resolve({ dir, name, type });
  };

  const loadContents = async () => {
    if (!fileService.isLoaded) return;
    // const path = buildFilePath({type});
    // const contents = await fileService.loadFileText(path);
    // if (editorRef?.current?.getValue() !== contents) {
    //   editorRef?.current?.setValue(contents);
    // }
    const model = ModelsService.instance.models[0];
    (model as any).getLanguageIdentifier = model.getLanguageId;
    editorRef.current.setModel(model);
  };

  const getStoryFilePath = () => {
    const story = props.api.getCurrentStoryData() as Story;
    return story?.parameters?.fileName ?? '';
  };

  const getMeta = (): FileMeta => {
    const path = getStoryFilePath();
    return parseFileName(path);
  };

  const onEditorMounted = (editor, monaco) => {
    editorRef.current = editor;
  };

  const onSaveKeyDown = () => {
    if (props.api.getSelectedPanel() !== props.title) return;
    const path = buildFilePath({ type });
    const value = editorRef?.current?.getValue();
    fileService.overwrite(path, value);
  };

  useEffect(() => {
    const destroy$ = new ReplaySubject<void>(1);
    fileService.saveKeyDown$
      .pipe(takeUntil(destroy$))
      .subscribe((e) => onSaveKeyDown());
    fileService.refresh$
      .pipe(takeUntil(destroy$))
      .subscribe(() => loadContents());
    return () => destroy$.next();
  });

  loadContents();

  return (
    <Editor
      theme="vs-dark"
      language={language}
      onMount={onEditorMounted}
      options={{ automaticLayout: true, tabSize: 2 }}
    />
  );
};

export const _Editor = React.memo(({ onMount, value }: any) => (
  <Editor onMount={onMount} value={value} />
));

export const EditorPanel = (props: Props) => {
  return (
    <EditorContainer
      title={props.title}
      language={props.language}
      type={props.type}
      api={props.api}
    />
  );
};
