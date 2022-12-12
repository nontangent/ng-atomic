import { AngularWorkspace } from "@angular/cli/src/utilities/config";
import { findUp } from "@angular/cli/src/utilities/find-up";
import { workspaces } from '@angular-devkit/core';
import { NxScopedHost } from 'nx/src/adapter/ngcli-adapter';
import path from "path";

export function projectFilePath(
  projectPath?: string,
  configNames = ['angular.json', '.angular.json', 'nx.json'],
): string | null {
  return (
    (projectPath && findUp(configNames, projectPath)) ||
    findUp(configNames, process.cwd()) ||
    findUp(configNames, __dirname)
  );
}

export class NxWorkspace extends AngularWorkspace {
  static async load(workspaceFilePath: string): Promise<AngularWorkspace> {
    const basePath = path.dirname(workspaceFilePath);
    const filePath = path.relative(basePath, workspaceFilePath);
    const host = new NxScopedHost(basePath);
    const result = await workspaces.readWorkspace(
      filePath,
      workspaces.createWorkspaceHost(host),
      workspaces.WorkspaceFormat.JSON,
    );
    return new NxWorkspace(result.workspace, workspaceFilePath);
  }
}

export async function getWorkspace(): Promise<AngularWorkspace | undefined> {
  const configPath = projectFilePath();
  return configPath ? NxWorkspace.load(configPath.replace('nx.json', 'angular.json')) : undefined;
}

