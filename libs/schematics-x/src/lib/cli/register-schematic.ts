import { getProjectByCwd } from '@angular/cli/src/utilities/config';
import { Command } from 'commander';
import { resolve } from 'path';
import { getWorkspace } from './utils/get-workspace';
import { Collection } from './interfaces';
import { CLI_OPTIONS_KEY } from './workflow-runner/options';
import { injectSchematicRunner } from './schematic-runner';
import { DEBUG, STD_ERR, STD_OUT } from './workflow-runner/handlers';

export const parseBooleanOptions = (_options: object, booleanOptions: string[] = []) => {
  const parseBoolean = (value) => value === 'true' ? true : value === 'false' ? false : value;
  return Object.entries(_options).reduce((acc, [key, value]) => {
    return {...acc, [key]: booleanOptions.includes(key) ? parseBoolean(value) : value};
  }, {});
};

export function registerCliOptions(command: Command) {
  command.option(`--interactive [boolean]`, `Enable interactive input prompts.`, true);
  command.option(`--force [boolean]`, `Force overwriting files that would otherwise be an error.`, false);
  command.option(`--verbose [boolean]`, `Show more information.`, false);
  command.option(`--allow-private [boolean]`, `Allow private schematics to be run from the command line.`, false);
  command.option(`--debug [boolean]`, `Debug mode.`,  null);
  command.option(`--dry-run [boolean]`, `Do not output anything, but instead just show what actions would be
  performed.`, null);
  command.option(`--workspace [boolean]`, 
    'Run in Angular or Nx workspace.(if not exists `angular.json` or `nx.json`, automatically disabled.)', true);
}


export function buildSchemaPath(collectionPath: string, schema: string): string {
  return resolve(collectionPath, '../', schema)
}

export function registerSchematic(
  program: Command,
  name: string,
  schematic: { description: string, schema: string, aliases?: string[] },
  collection: Collection,
  external = false,
) {
  const commandName = external ? `${collection.name}:${name}` : name;
  const command = program.command(commandName).description(schematic.description);
  ((schematic as any)?.aliases ?? []).forEach((alias) => command.alias(alias));
  const schemaPath = buildSchemaPath(collection.path, schematic.schema);
  const { properties } = require(schemaPath);
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

  registerCliOptions(command)

  command
    .arguments('[args...]')
    .action(async (args, _options) => {
      const options = parseBooleanOptions(_options, [...CLI_OPTIONS_KEY, ...booleanOptions]) as any;
      if (options['verbose']) process.env['SX_VERBOSE_LOGGING'] = 'true';
      const workspace = options.workspace ? await getWorkspace() : null;
      options.project = workspace ? getProjectByCwd(workspace) : undefined;

      process.env['SX_VERBOSE_LOGGING'] && console.debug('cliOptions:', {...options});
      workspace && process.chdir(workspace.basePath);

      const runner = injectSchematicRunner([
        { provide: DEBUG, useValue: !!options.debug },
        { provide: STD_OUT, useValue: process.stdout },
        { provide: STD_ERR, useValue: process.stderr },
      ]);
      await runner.run({
        schematic: `${collection.name}:${name}`,
        schematicArgs: args,
        options,
        fsHost: (workspace as any)?.host
      });
    });
}
