import { 
	Rule, Tree, SchematicContext, apply, chain, externalSchematic, 
	url, applyTemplates, mergeWith, move
} from '@angular-devkit/schematics';
import * as strings from '@angular-devkit/core/src/utils/strings';
import { parseName } from '@schematics/angular/utility/parse-name';
import { createDefaultPath } from '@schematics/angular/utility/workspace';
import * as format from 'string-template';
import { join } from 'path';
import { Schema } from './schema';

export const atomicComponent = (options: Schema): Rule => async (host: Tree, _: SchematicContext) => {
	options.prefix ??= 'extras';
	options.path = join(await createDefaultPath(host, options.project), options?.path ?? '');
	const { name, path, type } = options = {...options, ...parseName(options.path, options.name)};
	delete options.styleHeader;

	return chain([
		externalSchematic('@schematics/angular', 'module', {name, path, project: options.project}),
		externalSchematic('@schematics/angular', 'component', {...options, export: true}),
		// externalSchematic('angular-host-css-variable', 'component', {...options, styleHeader: format(options.styleHeader, { name, type }), export: true}),
		mergeWith(apply(url('./files'), [applyTemplates({...strings, name}), move(path)])),
		addExportIntoIndexTs({ ...options })
	]);
};

export const atom = (options: Schema): Rule => atomicComponent(buildOptions(options, 'atom'));
export const molecule = (options: Schema): Rule => atomicComponent(buildOptions(options, 'molecule'));
export const organism = (options: Schema): Rule => atomicComponent(buildOptions(options, 'organism'));
export const template = (options: Schema): Rule => atomicComponent(buildOptions(options, 'template'));
export const frame = (options: Schema): Rule => atomicComponent(buildOptions(options, 'frame'));

const buildOptions = (options: Schema, type: string) => 
	({...options, type: options.type || type, prefix: options.prefix || `${options.type || type}s`});

const addExportIntoIndexTs = ({path, name}: Schema) => (tree: Tree) => {
	const indexTsPath = join(path, 'index.ts');
	tree.exists(indexTsPath) || tree.create(indexTsPath, '');
	const lines = tree.read(indexTsPath)!.toString('utf-8').split('\n').filter(line => line.length);
	const line = `export { ${strings.classify(name)}Module } from './${strings.dasherize(name)}';`;
	tree.overwrite(indexTsPath, (lines.includes(line) ? lines : [...lines, line]).join('\n'));
	return tree;
};
