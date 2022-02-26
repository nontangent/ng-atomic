// /my-addon/src/register.js
import { addons, types } from '@storybook/addons';
import { AddonPanel } from '@storybook/components';
import React from 'react';
import { EditorPanel } from './components';
import { EditorPanelConfig, PANELS } from './config';
import { FileService } from './services';

const ADDON_ID = 'myaddon';
const PANEL_ID = `${ADDON_ID}/panel`;


const openSelectProjectDialog = () => new Promise((resolve) => {
  const dialog = document.createElement('div')
  dialog.style.cssText = `
    position: fixed;
    z-index: 10000;
    background: rgba(0, 0, 0, .6);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
  `;
  const button = document.createElement('button');
  button.innerText = 'Select Project';
  dialog.append(button);
  button.addEventListener('click', () => {
    document.body.removeChild(dialog);
    resolve(null);
  });
  document.body.appendChild(dialog);
});

const addPanel = ({title, language, type}: EditorPanelConfig, api) => {
  addons.add(title, {
    type: types.PANEL,
    title,
    render: ({ active, key }) => (
      <AddonPanel active={active} key={key}>
        <EditorPanel
          title={title}
          language={language} 
          type={type}
          fileService={FileService.instance}
          api={api}

        />
      </AddonPanel>
    ),
  });
}

addons.register(ADDON_ID, async (api) => {
  const fileService = FileService.instance;  
  PANELS.forEach(panel => addPanel(panel, api));

  openSelectProjectDialog()
    .then(() => fileService.loadFileHandleMapFromIndexedDB())
    .then(() => fileService.refresh$.next());  
});