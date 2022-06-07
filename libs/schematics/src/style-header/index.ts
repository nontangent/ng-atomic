import { Rule, Tree } from '@angular-devkit/schematics';
import { dasherize} from '@angular-devkit/core/src/utils/strings';
import format from 'string-template';
import { basename } from 'path';
import { Schema } from './schema';
import { saveFile } from '../_utilities/save-file';

const buildOptions = (options: Schema): Schema => ({
  ...options,
  name: options?.name || basename(options.path, '.scss').split('.')?.[0],
  type: options?.type || basename(options.path, '.scss').split('.').reverse()?.[0],
});

const buildStyle = ({styleHeader, name, type}: Pick<Schema, 'styleHeader' | 'name' | 'type'>): string =>
  format(styleHeader, {name: dasherize(name), type: type});

export default (_options: Schema): Rule => (host: Tree) => {
  const {path, ...extra} = buildOptions(_options);
  return saveFile(host, path, (src: string): string => `${buildStyle(extra)}${src}`);
}
