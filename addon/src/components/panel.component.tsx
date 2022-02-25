import { API, Story } from '@storybook/api';
import React, { useState, useEffect, useRef } from 'react';
import { FileService } from '../services';
import { Editor } from './editor.component';
import { isMetaKey, parseFileName } from '../utils';

interface State {
  contents?: string;
  dir?: string;
  name?: string;
  type?: string;
  ext?: string;
}

interface Props {
  title: string;
  language: string;
  type: 'stories.ts' | 'module.ts' | 'template.ts' | 'template.html' | 'template.scss';
  api: API;
  fileService: FileService;
}

const buildFilePath = ({dir, name, type}: State): string => `${dir}${name}.${type}`;

export function EditorPanel(props: Props) {
  const [contents, setContents] = useState('');
  const [language] = useState(props.language);
  const [type] = useState(props.type);

  const editorRef = useRef<any>(null);

  const loadContents = async () => {
    const [dir, name] = getMeta();
    const path = buildFilePath({type, dir, name});
    const contents = await props.fileService.loadFileText(path);
    setContents(contents);
  };

  const getStoryFilePath = () => {
    const story = props.api.getCurrentStoryData() as Story;
    return story?.parameters?.fileName ?? '';
  }

  const getMeta = (): [string, string, string] => {
    const path = getStoryFilePath();
    return parseFileName(path);
  }

  const onSaveKeyDown = () => {
    if (props.api.getSelectedPanel() !== props.title) return;
    const [dir, name] = getMeta();
    const path = buildFilePath({type, dir, name});
    const value = editorRef?.current?.getValue();
    props.fileService.overwrite(path, value);
  };

  useEffect(() => {
    const listener = async e => {
      if (isMetaKey(e) && e.key === 's') {
        e.preventDefault();
        e.stopPropagation();
        onSaveKeyDown();
      }
    };
    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  });

  props.fileService.isLoaded && loadContents();
  
  return <Editor ref={editorRef} state={{contents, language}} />;
}
