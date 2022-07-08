import { classify } from '@angular-devkit/core/src/utils/strings';

export function parseName(_name: string): [string, string, string] {
  const [type, ...words] = _name.split('-');
  const name = words.join('-');
  const moduleName = `${classify(name)}Module`;
  return [type, name, moduleName];
}
