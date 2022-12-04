#!/usr/bin/env node
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

// symbol polyfill must go first
import 'symbol-observable';
import { ProcessOutput, createConsoleLogger } from '@angular-devkit/core/node';
import { UnsuccessfulWorkflowExecution } from '@angular-devkit/schematics';
import { NodeWorkflow } from '@angular-devkit/schematics/tools';
import ansiColors from 'ansi-colors';
import { isTTY } from './is-tty';
import { _createPromptProvider } from './create-prompt-provider';
import { CliOptions, parseCliOptions } from './parse-cli-options';

export interface Options {
  cliOptions: CliOptions;
  collectionName: string;
  schematicName: string;
  schematicOptions: Record<string, unknown>;
  schematicArgs: string[];
  stdout?: ProcessOutput;
  stderr?: ProcessOutput;
}

export async function runWorkflow({
  cliOptions,
  collectionName,
  schematicName,
  schematicOptions,
  schematicArgs,
  stdout = process.stdout,
  stderr = process.stderr,
}: Options): Promise<0 | 1> {
  const _cliOptions = parseCliOptions(cliOptions);

  // Create a separate instance to prevent unintended global changes to the color configuration
  const colors = ansiColors.create();

  /** Create the DevKit Logger used through the CLI. */
  const logger = createConsoleLogger(!!_cliOptions.verbose, stdout, stderr, {
    info: (s) => s,
    debug: (s) => s,
    warn: (s) => colors.bold.yellow(s),
    error: (s) => colors.bold.red(s),
    fatal: (s) => colors.bold.red(s),
  });

    /** Create the workflow scoped to the working directory that will be executed with this run. */
    const workflow = new NodeWorkflow(process.cwd(), {
      force: _cliOptions.force,
      dryRun: _cliOptions.dryRun,
      resolvePaths: [process.cwd(), __dirname],
      schemaValidation: true,
    });

    if (_cliOptions.debug) {
      logger.info(`Debug mode enabled.`);
    }
  
    // Indicate to the user when nothing has been done. This is automatically set to off when there's
    // a new DryRunEvent.
    let nothingDone = true;
  
    // Logging queue that receives all the messages to show the users. This only get shown when no
    // errors happened.
    let loggingQueue: string[] = [];
    let error = false;
  
    /**
     * Logs out dry run events.
     *
     * All events will always be executed here, in order of discovery. That means that an error would
     * be shown along other events when it happens. Since errors in workflows will stop the Observable
     * from completing successfully, we record any events other than errors, then on completion we
     * show them.
     *
     * This is a simple way to only show errors when an error occur.
     */
    workflow.reporter.subscribe((event) => {
      nothingDone = false;
      // Strip leading slash to prevent confusion.
      const eventPath = event.path.startsWith('/') ? event.path.slice(1) : event.path;
  
      switch (event.kind) {
        case 'error':
          error = true;
  
          const desc = event.description == 'alreadyExist' ? 'already exists' : 'does not exist';
          logger.error(`ERROR! ${eventPath} ${desc}.`);
          break;
        case 'update':
          loggingQueue.push(`${colors.cyan('UPDATE')} ${eventPath} (${event.content.length} bytes)`);
          break;
        case 'create':
          loggingQueue.push(`${colors.green('CREATE')} ${eventPath} (${event.content.length} bytes)`);
          break;
        case 'delete':
          loggingQueue.push(`${colors.yellow('DELETE')} ${eventPath}`);
          break;
        case 'rename':
          const eventToPath = event.to.startsWith('/') ? event.to.slice(1) : event.to;
          loggingQueue.push(`${colors.blue('RENAME')} ${eventPath} => ${eventToPath}`);
          break;
      }
    });
  
    /**
     * Listen to lifecycle events of the workflow to flush the logs between each phases.
     */
    workflow.lifeCycle.subscribe((event) => {
      if (event.kind == 'workflow-end' || event.kind == 'post-tasks-start') {
        if (!error) {
          // Flush the log queue and clean the error state.
          loggingQueue.forEach((log) => logger.info(log));
        }
  
        loggingQueue = [];
        error = false;
      }
    });
  
    // Show usage of deprecated options
    workflow.registry.useXDeprecatedProvider((msg) => logger.warn(msg));

    // Pass the rest of the arguments as the smart default "argv". Then delete it.
    workflow.registry.addSmartDefaultProvider('argv', (schema) =>
      'index' in schema ? schematicArgs[Number(schema['index'])] : schematicArgs,
    );
  
    // Add prompts.
    if (_cliOptions.interactive && isTTY()) {
      workflow.registry.usePromptProvider(_createPromptProvider());
    }
  
    /**
     *  Execute the workflow, which will report the dry run events, run the tasks, and complete
     *  after all is done.
     *
     *  The Observable returned will properly cancel the workflow if unsubscribed, error out if ANY
     *  step of the workflow failed (sink or task), with details included, and will only complete
     *  when everything is done.
     */
    try {
      await workflow
        .execute({
          collection: collectionName,
          schematic: schematicName,
          options: schematicOptions,
          allowPrivate: !!_cliOptions['allow-private'],
          debug: _cliOptions.debug,
          logger: logger,
        })
        .toPromise();
  
      if (nothingDone) {
        logger.info('Nothing to be done.');
      } else if (_cliOptions.dryRun) {
        logger.info(
          `Dry run enabled${
            _cliOptions.dryRunPresent !== null ? '' : ' by default in debug mode'
          }. No files written to disk.`,
        );
      }
  
      return 0;
    } catch (err) {
      if (err instanceof UnsuccessfulWorkflowExecution) {
        // "See above" because we already printed the error.
        logger.fatal('The Schematic workflow failed. See above.');
      } else if (_cliOptions.debug && err instanceof Error) {
        logger.fatal(`An error occured:\n${err.stack}`);
      } else {
        logger.fatal(`Error: ${err instanceof Error ? err.message : err}`);
      }
  
      return 1;
    }
}
