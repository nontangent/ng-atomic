import { main as schematics } from '@angular-devkit/schematics-cli/bin/schematics';
import { Command } from 'commander';
import { resolve } from 'path';
import collectionJson from '../../../collection.json';
import packageJson from '../../../package.json';

const COLLECTION_JSON_PATH = resolve(__dirname, '../../../collection.json');

const program = new Command();
program.version(packageJson.version, '-v, --version', 'output the current version');

for (const [name, schematic] of Object.entries(collectionJson.schematics)) {
  const command = program.command(name).description(schematic.description);
  const { properties, required } = require(resolve(COLLECTION_JSON_PATH, '../', schematic.schema));

  Object.entries<any>(properties).forEach(([key, { type, description, default: defaultValue }]) => {
    const flags = type === 'boolean' ? `--${key}` : `--${key} <${type}>`;
    if ((required ?? []).includes(key)) {
      command.requiredOption(flags, description, defaultValue);
    } else {
      command.option(flags, description, defaultValue);
    }
  });

  command
    .arguments('[args...]')
    .allowUnknownOption()
    .action((_args, options) => {
      const args = [`schematics-x:${name}`, ..._args, ...makeCommandArgsFromOptions(options)];
      console.debug('args:', args);
      schematics({ args })
        .then((exitCode) => (process.exitCode = exitCode))
        .catch((e) => { throw e; });
    });
}

function makeCommandArgsFromOptions(options: any) {
  return Object.entries(options)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => value === true ? `--${key}` : `--${key}=${value}`);
}

program.parse();
