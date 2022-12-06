#!/usr/bin/env node
import { runWorkflow } from './run-workflow';
import { Command } from 'commander';
import { resolve } from 'path';
import collectionJson from '../../../collection.json';
import packageJson from '../../../package.json';
import { CliOptions, CLI_OPTIONS_KEY } from './parse-cli-options';

const COLLECTION_JSON_PATH = resolve(__dirname, '../../../collection.json');
const COLLECTION = process.env['DEBUG'] ? COLLECTION_JSON_PATH : 'schematics-x';

const program = new Command();
program.version(packageJson.version, '-v, --version', 'output the current version');

for (const [name, schematic] of Object.entries(collectionJson.schematics)) {
  const command = program.command(name).description(schematic.description);
  const { properties } = require(resolve(COLLECTION_JSON_PATH, '../', schematic.schema));

  Object.entries<any>(properties).forEach(([key, { type, description, default: defaultValue }]) => {
    const flags = type === 'boolean' ? `--${key} <${type}>` : `--${key} <${type}>`;
    command.option(flags, description, defaultValue);
  });

  command.option(`--interactive`, ``, true);
  command.option(`--force`, ``, false);
  command.option(`--verbose`, ``, false);
  command.option(`--allow-private`, ``, false);
  command.option(`--debug`, ``,  null);
  command.option(`--dry-run`, ``, null);

  command
    .arguments('[args...]')
    .allowUnknownOption()
    .action((schematicArgs, options) => {
      const cliOptions: CliOptions = {};
      const schematicOptions: Record<string, unknown> = {};

      Object.entries(options).forEach(([key, value]) => {
        if (CLI_OPTIONS_KEY.includes(key as any)) {
          cliOptions[key] = value;
        } else {
          schematicOptions[key] = value === 'true' ? true : value === 'false' ? false : value;
        }
      });
      
      runWorkflow({
        cliOptions,
        collectionName: COLLECTION,
        schematicName: name,
        schematicOptions,
        schematicArgs,
      })
        .then((exitCode) => (process.exitCode = exitCode))
        .catch((e) => { throw e; });
    });
}

program.parse();
