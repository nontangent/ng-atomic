import { Rule, schematic } from '@angular-devkit/schematics';
import { BaseSchema } from '../base-schema';
import { InstructSchema } from '../instruct';

export interface DirectorySchema extends BaseSchema {
  path: string;
  name: string;
  scope: string;
  inputScope?: string;
  outputScope?: string;
  
  inputs?: string;
}

export class DirectorySchematicAdaptor {
  static options(options: DirectorySchema): InstructSchema {
    return {
      project: options.project,
      path: options.path,
      parallel: options.parallel,
      overwrite: options.overwrite,
      instructions: `Generate a directory \`${options.name}\`.`,
      scope: options.scope,
      inputScope: options.inputScope,
      outputScope: options.outputScope,
      inputs: options.inputs,
      outputs: undefined,
    };
  }
}

export const directory = (options: DirectorySchema): Rule => () => {
  return schematic('instruct', DirectorySchematicAdaptor.options(options));
};
