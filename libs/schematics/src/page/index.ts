import { Rule, Tree, chain, externalSchematic, schematic } from '@angular-devkit/schematics';
import { parseName } from '@schematics/angular/utility/parse-name';
import * as format from 'string-template';
import { dasherize, classify } from '@angular-devkit/core/src/utils/strings';
import { Schema } from '../atomic-component/schema';

import { addPathToRoutes } from '../_utilities';
import { createDefaultPath } from '@schematics/angular/utility/workspace';

type TargetType = 'page' | 'pages';
type Target = {path: string, name: string};

export const page = (options: Schema): Rule => async (host: Tree) => {
	options.path ??= await createDefaultPath(host, options.project);
	options.type ??= 'page';
	options.name = resolveName(options.name);

	const { name, path, type, project, styleHeader } = options = {...options, ...parseName(options.path, options.name)};
	const pages = getPagesOptions(`${path}/${name}`);

	delete options['styleHeader'];

	return chain([
		schematic('pages', {...pages, project}),
		addRouteIntoPagesModule(options, pages),
		schematic('pages', {name, path, project}),
		externalSchematic('@schematics/angular', 'component', {...options, export: true}),
		// externalSchematic('@ng-atomic/host-variable', 'component', {...options, styleHeader: format(styleHeader, {name, type}), export: true}),
		addRouteIntoPageModule(options, {path, name}),
	]);
};

const getPagesOptions = (fullPath: string): {path: string, name: string} => {
	const [_, name, ...paths] = fullPath.split('/').reverse();
	return {name, path: paths.reverse().join('/')};
};

const resolveName = (name: string) => {
	return 'pages/' + name.split('/').filter(path => path !== 'pages').join('/pages/');
};

const addRouteIntoPagesModule = (options: Schema, target: Target) => {
	const routeOptions = buildOption(options, target, 'pages');
	return addPathToRoutes(routeOptions);
};

const addRouteIntoPageModule = (options: Schema, target: Target) => {
	const routeOptions = buildOption(options, target, 'page');
	return addPathToRoutes(routeOptions);
};

const buildOption = (options, {path, name}: Target, type: TargetType) => ({
	...options,
	routingModulePath: `${path}/${name}/${name}.module.ts`,
	route: type === 'pages' ? buildPagesRoute(options.name) : buildPageRoute(name),
	removeOtherRoutes: type === 'page',
});

const buildPagesRoute = (name): string => `
	{
		path: '${name}',
		loadChildren: () => import('./${dasherize(name)}/${dasherize(name)}.module').then(m => m.${classify(name)}Module)
	}`;

const buildPageRoute = (name): string => `
	{
		path: '',
		component: ${classify(name)}Page,
		// loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
	}`;
