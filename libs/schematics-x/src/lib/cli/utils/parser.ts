import { CliOptions, CLI_OPTIONS_KEY } from '../workflow-runner/options';

const parseBoolean = (value: unknown) => value === 'true' ? true : value === 'false' ? false : value;

export const parseOptions = (options) => {
  const cliOptions: CliOptions = {};
  const schematicOptions: Record<string, unknown> = {};

  Object.entries(options).forEach(([key, value]) => {
    if (CLI_OPTIONS_KEY.includes(key as any)) {
      cliOptions[key] = parseBoolean(value);
    } else {
      schematicOptions[key] = parseBoolean(value);
    }
  });
  return {cliOptions, schematicOptions};
};

export const parseSchematic = (schematic: string) => {
  const [collectionName, schematicName] = schematic.split(':');
  return {collectionName, schematicName};
}
