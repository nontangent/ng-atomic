export const isMetaKey = (e) => !(e.ctrlKey === e.metaKey);

export const parseFileName = (file: string): [string, string, string] => {
  const i =  file.lastIndexOf('/');
  const dir = file.substring(0, i+1);
  const fileName = file.substring(i+1, file.length);
  const j = fileName.indexOf('.')
  const name = fileName.substring(0, j);
  const ext = fileName.substring(j + 1, fileName.length);
  return [dir, name, ext];
}