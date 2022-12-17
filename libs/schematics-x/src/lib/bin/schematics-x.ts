#!/usr/bin/env node
import { Command } from 'commander';
import { resolve } from 'path';
import packageJson from '../../../package.json';
import { registerSchematics } from '../cli';

const COLLECTION_JSON_PATH = resolve(__dirname, '../../../collection.json');
const COLLECTION = process.env['SX_DEVELOPMENT'] ? COLLECTION_JSON_PATH : 'schematics-x';

export async function main() {
  const program = new Command();
  program.version(packageJson.version, '-v, --version', 'output the current version');
  registerSchematics(program, COLLECTION_JSON_PATH, COLLECTION);
  program.parse();
}

if (require.main === module) {
  main();
}
