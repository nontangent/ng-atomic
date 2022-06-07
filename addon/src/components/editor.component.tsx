import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { editor } from 'monaco-editor';
import { useState } from '@storybook/addons';

interface State {
  initialized: boolean;
}

interface Props {}

const DEFAULT_OPTIONS = {
  automaticLayout: true,
  lineNumbers: 'on',
  roundedSelection: false,
  scrollBeyondLastLine: false,
  readOnly: false,
  theme: 'vs-dark',
};

export const Editor = React.memo(
  forwardRef(({}: Props, ref) => {
    const el: React.RefObject<HTMLDivElement> = React.createRef();
    let _editor!: editor.IStandaloneCodeEditor;

    const initEditor = (options) => {
      _editor = editor.create(el.current, options);
    };

    useImperativeHandle(ref, () => ({ editor: _editor }));

    useEffect(() => {
      initEditor({
        ...DEFAULT_OPTIONS,
        value: '',
        language: '',
      });
      return () => _editor.dispose();
    });

    return <div ref={el} style={{ height: '100%' }}></div>;
  })
);
