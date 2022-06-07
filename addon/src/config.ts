import { FileType } from './components';

export interface EditorPanelConfig {
  title: string;
  language: string;
  type: FileType;
}

export const PANELS: EditorPanelConfig[] = [
  {
    title: 'Template',
    language: 'html',
    type: 'template',
  },
  {
    title: 'Style',
    language: 'scss',
    type: 'style',
  },
  {
    title: 'Component',
    language: 'typescript',
    type: 'component',
  },
  {
    title: 'Module',
    language: 'typescript',
    type: 'module',
  },
  {
    title: 'Stories',
    language: 'typescript',
    type: 'stories',
  },
];
