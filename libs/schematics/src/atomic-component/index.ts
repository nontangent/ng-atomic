import { 
	Rule, Tree, SchematicContext, apply, chain,
	externalSchematic, schematic,
	url, applyTemplates, mergeWith, move
} from '@angular-devkit/schematics';
import * as strings from '@angular-devkit/core/src/utils/strings';
import { parseName } from '@schematics/angular/utility/parse-name';
import { createDefaultPath } from '@schematics/angular/utility/workspace';
import { join } from 'path';
import { Schema } from './schema';

export const atomicComponent = (options: Schema): Rule => async (host: Tree, _: SchematicContext) => {
	options.prefix ??= 'extras';
	options.path = join(await createDefaultPath(host, options.project), options?.path ?? '');
	const { name, path, type } = options = {...options, ...parseName(options.path, options.name)};
	const componentExt = options.useTypeAsExtension ? type : 'component';
	const scssPath = `${path}/${name}/${name}.${componentExt}.scss`;

	return chain([
		externalSchematic('@schematics/angular', 'module', {name, path, project: options.project}),
		externalSchematic('@schematics/angular', 'component', {...options, type: componentExt, export: true}),
		schematic('style-header', {...options, name, type, path: scssPath}),
		mergeWith(apply(url('./files'), [applyTemplates({...strings, name, type: type ?? 'component'}), move(path)])),
		// addExportIntoIndexTs({ ...options })
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
