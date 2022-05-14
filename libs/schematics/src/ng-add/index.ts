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

		addPackageToPackageJson(host, '@ng-atomic/schematics', '^1.0.0', 'devDependencies');
		addPackageToPackageJson(host, 'scoped-var', '^1.0.0', 'devDependencies');

		const installTaskId = context.addTask(new NodePackageInstallTask());
		
		// Set Up Angular Atomic Schematics
		context.addTask(new RunSchematicTask('setup', {...options}), [installTaskId])

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