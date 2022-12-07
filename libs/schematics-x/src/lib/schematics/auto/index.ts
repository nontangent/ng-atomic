import { Rule, schematic } from '@angular-devkit/schematics';
import { hasExt } from '../../core/helpers/utils';
import { BaseSchema } from '../base-schema';
import { DirectorySchematicAdaptor } from '../directory';
import { FileSchematicAdaptor } from '../file';
import { InstructSchema } from '../instruct';


export interface AutoSchema extends BaseSchema {
  path: string;
  name: string;

  scope: string;
  inputScope?: string;
  outputScope?: string;
  inputs?: string;
  outputs?: string;
}

export class AutoSchematicAdaptor {
  static options(options: AutoSchema): InstructSchema {
    if (hasExt(options.name)) {
      return FileSchematicAdaptor.options({...options});
    } else {
      return DirectorySchematicAdaptor.options({...options});
    }
  }
}

export const auto = (options: AutoSchema): Rule => () => {
  return schematic('instruct', AutoSchematicAdaptor.options(options));
};
