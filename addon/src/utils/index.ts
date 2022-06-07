export const isMetaKey = (e) => !(e.ctrlKey === e.metaKey);

export interface FileMeta {
  dir: string;
  fileName: string;
  name: string;
  type: string;
  ext: string;
}

export const parseFileName = (file: string): FileMeta => {
  const i = file.lastIndexOf('/');
  const dir = file.substring(0, i);
  const fileName = file.substring(i + 1, file.length);
  const [name, ...remain] = fileName.split('.');
  const ext = remain.pop();
  return { dir, fileName, name, type: remain.join('.'), ext };
};
