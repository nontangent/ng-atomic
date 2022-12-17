#!/usr/bin/env node
import { Command } from 'commander';
import { resolve } from 'path';
import packageJson from '../../../package.json';
import { registerSchematics } from '../cli/commands/register-schematics';
import { register } from '../cli/commands/interactive';

const COLLECTION_JSON_PATH = resolve(__dirname, '../../../collection.json');
const COLLECTION = process.env['SX_DEVELOPMENT'] ? COLLECTION_JSON_PATH : 'schematics-x';

export async function main() {
  const program = new Command();
  program.version(packageJson.version, '-v, --version', 'output the current version');
  registerSchematics(program, {path: COLLECTION_JSON_PATH, name: COLLECTION});
  registerSchematics(program, {path: 'node_modules/@schematics/angular/collection.json', name: '@schematics/angular'}, true);
  register(program);

  program.parse();

  console.debug(program.args.length)
}

if (require.main === module) {
  main();
}
