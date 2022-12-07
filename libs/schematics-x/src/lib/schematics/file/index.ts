import { Rule, schematic, Tree } from '@angular-devkit/schematics';
import { BaseSchema } from '../base-schema';
import { InstructSchema } from '../instruct';

export interface FileSchema extends BaseSchema {
  name: string;
  inputScope: string;
  inputs?: string;
}

export class FileSchematicAdaptor {
  static options(options: FileSchema): InstructSchema {
    return {
      project: options.project,
      path: options.path,
      parallel: options.parallel,
      overwrite: options.overwrite,
      instructions: `Generate a file \`${options.name}\`.`,
      inputScope: options.inputScope,
      outputScope: options.name,
      inputs: options.inputs,
      outputs: options.name,
    };
  }
}

export const file = (options: FileSchema): Rule => async (tree: Tree) => {
  return schematic('instruct', FileSchematicAdaptor.options(options));
};
