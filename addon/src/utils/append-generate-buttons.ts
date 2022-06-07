export type OnGenerateClick = (type: string) => void;

export const buildGenerateButton = () => {
  const el = document.createElement('button');
  el.innerText = '+';
  return el;
};

const COMPONENT_TYPE_MAP = {
  atoms: 'atom',
  molecules: 'molecule',
  organisms: 'organism',
  templates: 'template',
  pages: 'page',
  frames: 'frame',
};

const getType = (id: string): string | null => {
  return COMPONENT_TYPE_MAP?.[id] ?? null;
};

export const appendGenerateButtons = (onClick: OnGenerateClick) => {
  const expandButtons = document.getElementsByClassName(
    'sidebar-subheading-action'
  );
  for (let i = 0; i < expandButtons.length; i++) {
    const el = expandButtons.item(i);
    const id = el.parentElement.getAttribute('id');
    const type = getType(id);
    if (!type) continue;

    const button = buildGenerateButton();
    el.parentNode.append(button);
    button.addEventListener('click', () => onClick(type));
  }
};
