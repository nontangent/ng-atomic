// /my-addon/src/register.js
import { addons, types, useStoryContext } from '@storybook/addons';
import { useStorybookState } from '@storybook/api';
import { AddonPanel } from '@storybook/components';
import React from 'react';
import { EditorPanel } from './components';
import { EditorPanelConfig, PANELS } from './config';
import { FileService } from './services';

const ADDON_ID = 'myaddon';
const PANEL_ID = `${ADDON_ID}/panel`;


const openSelectProjectModal = async (callback: () => Promise<void>) => new Promise((resolve) => {
  const modal = document.createElement('div')
  modal.style.cssText = `
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
  modal.append(button);
  button.addEventListener('click', async () => {
    await callback();
    document.body.removeChild(modal);
    resolve(null);
  });
  document.body.appendChild(modal);
});

addons.register(ADDON_ID, async (api) => {
  const fileService = new FileService();  
  // await fileService.loadFileHandleMapFromIndexedDB();

  const addPanel = ({title, language, type}: EditorPanelConfig) => {
    addons.add(title, {
      type: types.PANEL,
      title: title,
      render: ({ active, key }) => {
        return <AddonPanel active={active} key={key}>
          {(() => <EditorPanel
            title={title}
            language={language} 
            type={type as any}
            fileService={fileService}
            api={api}
          />)()}
        </AddonPanel>
      },
    });
  }

  PANELS.forEach(panel => addPanel(panel));

  await openSelectProjectModal(async () => {
    await fileService.loadFileHandleMapFromIndexedDB();

  });  
});