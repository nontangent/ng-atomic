import { Command } from 'commander';
import { readFileSync } from 'fs';
import { Collection } from './interfaces';
import { registerSchematic } from './register-schematic';

export function registerSchematics(program: Command, collection: Collection, external = false) {
  const json = JSON.parse(readFileSync(collection.path, 'utf-8').toString());

  for (const [name, schematic] of Object.entries(json.schematics)) {
    if (name === 'ng-add' || (schematic as any)?.private) continue;
    registerSchematic(program, name, schematic as any, collection, external);
  }
}
