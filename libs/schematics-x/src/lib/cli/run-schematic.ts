import { runWorkflow } from "./run-workflow";
import { CliOptions, CLI_OPTIONS_KEY } from './parse-cli-options';


export const parseOptions = (options) => {
  const cliOptions: CliOptions = {};
  const schematicOptions: Record<string, unknown> = {};

  Object.entries(options).forEach(([key, value]) => {
    if (CLI_OPTIONS_KEY.includes(key as any)) {
      cliOptions[key] = value === 'true' ? true : value === 'false' ? false : value;
    } else {
      schematicOptions[key] = value === 'true' ? true : value === 'false' ? false : value;
    }
  });
  return {cliOptions, schematicOptions};
};

export const parseSchematic = (schematic: string) => {
  const [collectionName, schematicName] = schematic.split(':');
  return {collectionName, schematicName};
}

export const runSchematic = (schematic: string) => (schematicArgs, options, fsHost) => {
  return runWorkflow({
    ...parseOptions(options),
    ...parseSchematic(schematic),
    fsHost,
    schematicArgs,
  })
    .then((exitCode) => (process.exitCode = exitCode))
    .catch((e) => { throw e; });
};
