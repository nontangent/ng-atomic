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
	options.prefix ||= `${options.type}s`;
	options.path = join(await createDefaultPath(host, options.project), options?.path ?? '');

	const { name, path, type, project } = options = {...options, ...parseName(options.path, options.name)};
	const { styleHeader, useTypeAsExtension, ...opt } = options;
	const componentExt = useTypeAsExtension ? type : 'component';
	const scssPath = `${path}/${name}/${name}.${componentExt}.scss`;

	return chain([
		externalSchematic('@schematics/angular', 'module', {name, path, project}),
		externalSchematic('@schematics/angular', 'component', {...opt, type: componentExt, export: true}),
		mergeWith(apply(url('./files'), [applyTemplates({...strings, name, type: type ?? 'component'}), move(path)])),
		schematic('style-header', {...options, styleHeader, name, type, path: scssPath}),
	]);
};

export const atom = (options: Schema): Rule => atomicComponent(({...options, type: 'atom'}));
export const molecule = (options: Schema): Rule => atomicComponent(({...options, type: 'molecule'}));
export const organism = (options: Schema): Rule => atomicComponent(({...options, type: 'organism'}));
export const template = (options: Schema): Rule => atomicComponent(({...options, type: 'template'}));
export const frame = (options: Schema): Rule => atomicComponent(({...options, type: 'frame'}));
