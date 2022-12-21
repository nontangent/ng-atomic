import { _createPromptProvider } from '../utils/create-prompt-provider';
import { parseWorkflowRawOptions } from '../workflow-runner/options';
import { parseOptions, parseSchematic } from '../utils';

export interface SchematicRunnerOptions {
  schematic: string,
  schematicArgs: string[],
  options: Record<string, unknown>,
  fsHost: any,
}

export function parseSchematicOptions({
  schematic, options, schematicArgs, fsHost,
}: SchematicRunnerOptions) {
  return parseWorkflowRawOptions({
    ...parseSchematic(schematic),
    ...parseOptions(options),
    schematicArgs,
    fsHost,
  });
}
