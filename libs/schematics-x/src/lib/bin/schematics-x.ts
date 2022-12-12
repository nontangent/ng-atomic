#!/usr/bin/env node
import { getProjectByCwd } from '@angular/cli/src/utilities/config';
import { Command } from 'commander';
import { resolve } from 'path';
import collectionJson from '../../../collection.json';
import packageJson from '../../../package.json';
import { runWorkflow } from './run-workflow';
import { CliOptions, CLI_OPTIONS_KEY } from './parse-cli-options';

import { getWorkspace } from './get-workspace';

const COLLECTION_JSON_PATH = resolve(__dirname, '../../../collection.json');
const COLLECTION = process.env['SX_DEVELOPMENT'] ? COLLECTION_JSON_PATH : 'schematics-x';

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

export const runSchematic = (schematic: string) => (schematicArgs, options, fsHost) => {
  runWorkflow({
    ...parseOptions(options),
    ...parseSchematic(schematic),
    fsHost,
    schematicArgs,
  })
    .then((exitCode) => (process.exitCode = exitCode))
    .catch((e) => { throw e; });
};

export const parseBooleanOptions = (_options: object, booleanOptions: string[] = []) => {
  const parseBoolean = (value) => value === 'true' ? true : value === 'false' ? false : value;
  return Object.entries(_options).reduce((acc, [key, value]) => {
    return {...acc, [key]: booleanOptions.includes(key) ? parseBoolean(value) : value};
  }, {});
};

export async function main() {
  const program = new Command();
  program.version(packageJson.version, '-v, --version', 'output the current version');
  
  for (const [name, schematic] of Object.entries(collectionJson.schematics)) {
    if (name === 'ng-add' || (schematic as any)?.private) continue;
    
    const command = program.command(name).description(schematic.description);
    ((schematic as any)?.aliases ?? []).forEach((alias) => command.alias(alias));
    const { properties } = require(resolve(COLLECTION_JSON_PATH, '../', schematic.schema));
    const booleanOptions = [];

    const resolveOptionFlags = (key: string, type: string, alias?: string) => {
      key = alias ? `-${alias}, --${key}` : `--${key}`;
      return type === 'boolean' ? `${key} [${type}]` : `${key} <${type}>`;
    };
  
    Object.entries<any>(properties).forEach(([key, { type, description, default: defaultValue, alias, visible }]) => {
      if (typeof visible === 'boolean' && !visible) return;
      booleanOptions.push(key);
      command.option(resolveOptionFlags(key, type, alias), description, defaultValue);
    });
  
    command.option(`--interactive [boolean]`, `Enable interactive input prompts.`, true);
    command.option(`--force [boolean]`, `Force overwriting files that would otherwise be an error.`, false);
    command.option(`--verbose [boolean]`, `Show more information.`, false);
    command.option(`--allow-private [boolean]`, `Allow private schematics to be run from the command line.`, false);
    command.option(`--debug [boolean]`, `Debug mode.`,  null);
    command.option(`--dry-run [boolean]`, `Do not output anything, but instead just show what actions would be
    performed.`, null);
    command.option(`--in-workspace [boolean]`, 
      'Run in Angular or Nx workspace.(if not exists `angular.json` or `nx.json`, automatically disabled.)', true);

    command
      .arguments('[args...]')
      .action(async (args, _options) => {
        const options = parseBooleanOptions(_options, booleanOptions) as any;
        if (options['verbose']) process.env['SX_VERBOSE_LOGGING'] = 'true';
        const workspace = options.inWorkspace ? await getWorkspace() : null;
        options.project = workspace ? getProjectByCwd(workspace) : undefined;

        process.env['SX_VERBOSE_LOGGING'] && console.debug('cliOptions:', {...options});
        workspace && process.chdir(workspace.basePath);
        runSchematic(`${COLLECTION}:${name}`)(args, {...options}, workspace?.host);
      });
  }
  program.parse();
}

if (require.main === module) {
  main();
}
