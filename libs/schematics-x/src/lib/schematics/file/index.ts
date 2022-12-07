import { Rule, schematic, Tree } from '@angular-devkit/schematics';
import { BaseSchema } from '../base-schema';
import { InstructSchema } from '../instruct';

export interface FileSchema extends BaseSchema {
  name: string;
  scope: string;
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
      scope: options.scope,
      inputScope: options.scope,
      outputScope: options.name,
      inputs: options.inputs,
      outputs: options.name,
    };
  }
}

export const file = (options: FileSchema): Rule => async (tree: Tree) => {
  return schematic('instruct', FileSchematicAdaptor.options(options));
};
