import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';
import {
	addPackageToPackageJson,
	addStyleIncludePathToAngularJson,
	setDefaultCollectionToAngularJson,
	getPackageVersionFromPackageJson
} from '../utils';
import { Schema } from './schema';

export function index(options: Schema): Rule {
	return (host: Tree, context: SchematicContext) => {
		const ngCoreVersionTag = getPackageVersionFromPackageJson(host, '@angular/core');
		const angularDependencyVersion = ngCoreVersionTag || `0.0.0-NG`;
	
		if (angularDependencyVersion === '0.0.0-NG') {
		  throw new Error('@angular/core version is not supported.');
		}	

		addPackageToPackageJson(
			host,
			'angular-host-css-variable',
			getCustomWebpackVersion(angularDependencyVersion),
			'devDependencies'
		);

		addPackageToPackageJson(
			host,
			'angular-custom-webpack-chaining',
			getCustomWebpackVersion(angularDependencyVersion),
			'devDependencies'
		);

		context.addTask(new NodePackageInstallTask());

		addStyleIncludePathToAngularJson(
			host,
			options.project,
			'node_modules/host-css-variable'
		);

		const packageName = 'angular-host-css-variable';
		const collection = `${packageName}`;
		setDefaultCollectionToAngularJson(host, collection);

		context.addTask(new RunSchematicTask(
			'angular-custom-webpack-chaining',
			'ng-add',
			{ project: options.project }
		));

		context.addTask(new RunSchematicTask(
			'angular-custom-webpack-chaining',
			'add-chain',
			{
				project: options.project,
				path: 'node_modules/angular-host-css-variable',
				architect: 'build'
			}
		));

    return host;
  };
}

export function getCustomWebpackVersion(ver: string): string {
	const [major, minor, patch] = (ver.replace(/(\^|\~)/, '')).split('.');
	switch (major) {
	  case '10': return '^0.1000.0';
	  case '11': return '^0.1100.0';
	  default: throw new Error('@angular/core version is not supported.');
	}
}
