#!/usr/bin/env node
import { runWorkflow } from './run-workflow';
import { Command } from 'commander';
import { resolve } from 'path';
import collectionJson from '../../../collection.json';
import packageJson from '../../../package.json';
import { CliOptions, CLI_OPTIONS_KEY } from './parse-cli-options';

const COLLECTION_JSON_PATH = resolve(__dirname, '../../../collection.json');
const COLLECTION = process.env['DEBUG'] ? COLLECTION_JSON_PATH : 'schematics-x';

export const parseOptions = (options) => {
  const cliOptions: CliOptions = {};
  const schematicOptions: Record<string, unknown> = {};

  Object.entries(options).forEach(([key, value]) => {
    if (CLI_OPTIONS_KEY.includes(key as any)) {
      cliOptions[key] = value;
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

export const runSchematic = (schematic: string) => (schematicArgs, options) => {
  runWorkflow({
    ...parseOptions(options),
    ...parseSchematic(schematic),
    schematicArgs,
  })
    .then((exitCode) => (process.exitCode = exitCode))
    .catch((e) => { throw e; });
};

export async function main() {
  const program = new Command();
  program.version(packageJson.version, '-v, --version', 'output the current version');
  
  for (const [name, schematic] of Object.entries(collectionJson.schematics)) {
    const command = program.command(name).description(schematic.description);
    ((schematic as any)?.aliases ?? []).forEach((alias) => command.alias(alias));
    const { properties } = require(resolve(COLLECTION_JSON_PATH, '../', schematic.schema));
  
    Object.entries<any>(properties).forEach(([key, { type, description, default: defaultValue }]) => {
      const flags = type === 'boolean' ? `--${key} <${type}>` : `--${key} <${type}>`;
      command.option(flags, description, defaultValue);
    });
  
    command.option(`--interactive`, `Enable interactive input prompts.`, true);
    command.option(`--force`, `Force overwriting files that would otherwise be an error.`, false);
    command.option(`--verbose`, `Show more information.`, false);
    command.option(`--allow-private`, `Allow private schematics to be run from the command line.`, false);
    command.option(`--debug`, `Debug mode.`,  null);
    command.option(`--dry-run`, `Do not output anything, but instead just show what actions would be
    performed.`, null);

    command
      .arguments('[args...]')
      .allowUnknownOption()
      .action(runSchematic(`${COLLECTION}:${name}`));
  }
  program.parse();
}

if (require.main === module) {
  main();
}
