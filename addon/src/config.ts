export interface EditorPanelConfig {
  title: string;
  language: string;
  type: string;
}

export const PANELS: EditorPanelConfig[] = [
  {
    title: 'Template',
    language: 'html',
    type: 'template.html',
  },
  {
    title: 'Style',
    language: 'scss',
    type: 'template.scss',
  },
  {
    title: 'Component',
    language: 'typescript',
    type: 'template.ts',
  },
  {
    title: 'Module',
    language: 'typescript',
    type: 'module.ts',
  },
  {
    title: 'StoryBook',
    language: 'typescript',
    type: 'stories.ts',
  }
];
