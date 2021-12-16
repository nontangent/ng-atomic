import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';
import { addPackageToPackageJson, getPackageVersionFromPackageJson } from '../_utilities';

export default function(options: any): Rule {
  return (host: Tree, context: SchematicContext) => {
    const ngCoreVersionTag = getPackageVersionFromPackageJson(host, '@angular/core');
    const angularDependencyVersion = ngCoreVersionTag || `0.0.0-NG`;

    if (angularDependencyVersion === '0.0.0-NG') {
      throw new Error('@angular/core version is not supported.');
    }

		// 必要なパッケージの追加
		addPackageToPackageJson(
			host, 
			'angular-atomic-schematics', 
			getCustomWebpackVersion(angularDependencyVersion),
			'devDependencies'
		);

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

		const installTaskId = context.addTask(new NodePackageInstallTask());

		// angular-host-css-variableのインストール
		const runSchematicTask = context.addTask(new RunSchematicTask(
			'angular-host-css-variable',
			'ng-add',
			{ project: options.project }
		), [installTaskId]);
		
		// Set Up Angular Atomic Schematics
		context.addTask(new RunSchematicTask('setup-project', {...options}), [runSchematicTask])

		return host
  }
}

export function getCustomWebpackVersion(ver: string): string {
  const [major, minor, patch] = (ver.replace(/(\^|\~)/, '')).split('.');
  switch (major) {
    case '10': return '^0.1000.0';
    case '11': return '^0.1100.0';
    default: throw new Error('@angular/core version is not supported.');
  }
}