import { ProcessOutput } from '@angular-devkit/core/node';
import { virtualFs } from '@angular-devkit/core';
import { CliOptions, parseCliOptions, ParsedCliOptions } from './parse-cli-options';
import { InjectionToken } from '@nx-ddd/core';

export const WORKFLOW_OPTIONS = new InjectionToken('[schematics-x] Workflow Options');

export interface WorkflowOptions {
  cliOptions: ParsedCliOptions;
  collectionName: string;
  schematicName: string;
  schematicOptions: Record<string, unknown>;
  schematicArgs: string[];
  fsHost?: virtualFs.Host<{}>;
  stdout?: ProcessOutput;
  stderr?: ProcessOutput;
}

export interface WorkflowRawOptions {
  cliOptions: CliOptions;
  collectionName: string;
  schematicName: string;
  schematicOptions: Record<string, unknown>;
  schematicArgs: string[];
  fsHost?: virtualFs.Host<{}>;
  stdout?: ProcessOutput;
  stderr?: ProcessOutput;
}

export function parseWorkflowRawOptions(options: WorkflowRawOptions): WorkflowOptions {
  return {...options, cliOptions: parseCliOptions(options.cliOptions)};
}
