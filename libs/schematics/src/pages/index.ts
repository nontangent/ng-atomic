import { strings } from '@angular-devkit/core';
import { Rule, Tree, apply, applyTemplates, mergeWith, move, noop, url } from '@angular-devkit/schematics';
import { parseName } from '@schematics/angular/utility/parse-name';
import { createDefaultPath } from '@schematics/angular/utility/workspace';
import { Schema } from './schema';

export const pages = (options: Schema): Rule => async (host: Tree) => {
  options.path ??= await createDefaultPath(host, options.project);
  const { name, path } = options = {...options, ...parseName(options.path, options.name)};
  return host.exists(`${path}/${name}/${name}.module.ts`) ? noop() : genModule(options);
};

const genModule = (options: Schema) => 
  mergeWith(apply(url('./files'), [applyTemplates({...strings, ...options}), move(options.path)]));
