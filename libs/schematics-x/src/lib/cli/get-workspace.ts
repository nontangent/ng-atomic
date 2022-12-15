import { AngularWorkspace } from "@angular/cli/src/utilities/config";
import { findUp } from "@angular/cli/src/utilities/find-up";
import { workspaces } from '@angular-devkit/core';
import path from "path";

export function projectFilePath(
  projectPath?: string,
  configNames = ['angular.json', '.angular.json', 'nx.json'],
): string | null {
  return (
    (projectPath && findUp(configNames, projectPath)) ||
    findUp(configNames, process.cwd())
  );
}

export class NxWorkspace extends AngularWorkspace {
  constructor(
    workspace: workspaces.WorkspaceDefinition,
    workspaceFilePath: string,
    public host: import('./nx-scoped-host').NxScopedHost,
  ) {
    super(workspace, workspaceFilePath);
  }

  static async load(workspaceFilePath: string): Promise<NxWorkspace> {
    const basePath = path.dirname(workspaceFilePath);
    const filePath = path.relative(basePath, workspaceFilePath);
    const { NxScopedHost } = await import('./nx-scoped-host');
    const host = new NxScopedHost(basePath);
    const result = await workspaces.readWorkspace(
      filePath,
      workspaces.createWorkspaceHost(host),
      workspaces.WorkspaceFormat.JSON,
    );
    return new NxWorkspace(result.workspace, workspaceFilePath, host);
  }
}

export async function getWorkspace(): Promise<NxWorkspace | AngularWorkspace | undefined> {
  const configPath = projectFilePath();
  if (!configPath) {
    return undefined;
  } else if (configPath.endsWith('nx.json')) {
    return NxWorkspace.load(configPath.replace('nx.json', 'angular.json'));
  } else {
    return AngularWorkspace.load(configPath);
  }
}

