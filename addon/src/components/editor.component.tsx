import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { editor } from 'monaco-editor';
import { useState } from '@storybook/addons';

interface State {
  initialized: boolean;
}

interface Props {
  state: {
    language: string;
    contents: string;
  }
}


const DEFAULT_OPTIONS = {
  automaticLayout: true,
  lineNumbers: 'on',
  roundedSelection: false,
  scrollBeyondLastLine: false,
  readOnly: false,
  theme: 'vs-dark',
};

export const Editor = forwardRef(({state}: Props, ref) => {
  const el: React.RefObject<HTMLDivElement> = React.createRef();
  let _editor!: editor.IStandaloneCodeEditor;

  const initEditor = (options) => {
    _editor = editor.create(el.current, options);
  };

  const getValue = () => _editor.getValue();

  useImperativeHandle(ref, () => ({
    getValue: () =>{
      return getValue();
    }
  }));

  useEffect(() => {
    initEditor({
      ...DEFAULT_OPTIONS,
      value: state.contents,
      language: state.language,
    });
    return () => _editor.dispose();
  }, [state]);

  return <div ref={el} style={{height: "100%"}}></div>;
})
