import { Rule, Tree, chain, externalSchematic, schematic } from '@angular-devkit/schematics';
import { parseName } from '@schematics/angular/utility/parse-name';
import { dasherize, classify } from '@angular-devkit/core/src/utils/strings';
import { Schema } from '../atomic-component/schema';

import { addPathToRoutes } from '../_utilities';
import { createDefaultPath } from '@schematics/angular/utility/workspace';

type TargetType = 'page' | 'pages';
type Target = {path: string, name: string};

export const page = (options: Schema): Rule => async (host: Tree) => {
	options.type = 'page';
	options.name = resolveName(options.name);

	options.prefix ||= `${options.type}s`;
	options.path ??= await createDefaultPath(host, options.project);

	const { name, path, type, project } = options = {...options, ...parseName(options.path, options.name)};
	const { styleHeader, useTypeAsExtension, ...opt } = options;
	const componentExt = useTypeAsExtension ? type : 'component';
	const scssPath = `${path}/${name}/${name}.${componentExt}.scss`;
	const pages = getPagesOptions(`${path}/${name}`);

	return chain([
		schematic('pages', {...pages, project}),
		addRouteIntoPagesModule(options, pages),
		schematic('pages', {name, path, project}),
		externalSchematic('@schematics/angular', 'component', {...opt, changeDetection: 'Default', export: true}),
		schematic('style-header', {...options, styleHeader, name, type, path: scssPath}),
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
