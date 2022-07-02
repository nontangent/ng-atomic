// /my-addon/src/register.js
import { addons, types } from '@storybook/addons';
import { AddonPanel } from '@storybook/components';
import React from 'react';
import { EditorPanel } from './components';
import { EditorPanelConfig, PANELS } from './config';
import { FileService } from './services';
import { ApiService } from './services/api.service';
import { EditorService } from './services/editor.service';
import { appendGenerateButtons } from './utils/append-generate-buttons';

const ADDON_ID = 'myaddon';
const PANEL_ID = `${ADDON_ID}/panel`;

const openSelectProjectDialog = () =>
  new Promise((resolve) => {
    const dialog = document.createElement('div');
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

const addPanel = ({ title, language, type }: EditorPanelConfig, api) => {
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
};

const onGenerateButtonClick = (type: string): void => {
  const name = prompt('Please type component name');
  if (!name) return;
  const api = ApiService.instance;
  api
    .generate({ type, name })
    .then(() => EditorService.instance.loadFiles())
    .then(() => {
      alert('component created!!');
    });
};

addons.register(ADDON_ID, async (api) => {
  const fileService = FileService.instance;
  PANELS.forEach((panel) => addPanel(panel, api));

  openSelectProjectDialog()
    .then(() => EditorService.instance.loadFiles())
    .then(() => fileService.refresh$.next());

  setTimeout(() => appendGenerateButtons(onGenerateButtonClick), 500);
});

// addons.setConfig({
//   sidebar: {
//     showRoots: true,
//     collapsedRoots: ['other'],
//     renderLabel: (item) => {
//       console.debug('item:', item);
//       return item.isRoot ? <>{item.name}!!</> : <>{item.name}</>
//     }
//   },
// });
