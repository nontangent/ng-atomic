import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';

export const defaultWorkspaceOptions = {
  name: 'workspace',
  newProjectRoot: 'projects',
  version: '6.0.0',
};

export const defaultAppOptions = {
  name: 'app',
  inlineStyle: false,
  inlineTemplate: false,
  viewEncapsulation: 'Emulated',
  routing: false,
  style: 'scss',
  skipTests: false,
};

export function getTestProjectPath(
  workspaceOptions: any = defaultWorkspaceOptions,
  options: any = defaultAppOptions
) {
  return `/${workspaceOptions.newProjectRoot}/${options.name}`;
}

export async function createWorkspace(
  runner: SchematicTestRunner, host: UnitTestTree,
  workspaceOptions = defaultWorkspaceOptions, options = defaultAppOptions
) {
  host = await runner.runExternalSchematicAsync('@schematics/angular', 'workspace', workspaceOptions).toPromise();
  host = await runner.runExternalSchematicAsync('@schematics/angular', 'application', options, host).toPromise();
  host = await runner.runExternalSchematicAsync('@schematics/angular', 'application', {...options, name: 'app2'}, host).toPromise();
  return host;
}

export async function createNxWorkspace(
  runner: SchematicTestRunner,
  host: UnitTestTree,
  workspaceOptions = defaultWorkspaceOptions,
  options = defaultAppOptions,
) {
  host = await runner.runExternalSchematicAsync('@nrwl/angular', 'workspace', {...workspaceOptions, cli: 'angular'}, host).toPromise();
  // host = await runner.runExternalSchematicAsync('@nrwl/angular', 'application', options, host).toPromise();
  return host;
}
