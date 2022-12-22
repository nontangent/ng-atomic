export interface ParsedCliOptions {
  debugPresent: boolean;
  debug: boolean;
  dryRunPresent: boolean;
  dryRun: boolean;
  force: boolean;
  interactive: boolean;
  verbose: boolean;
  allowPrivate: boolean;
}

export const CLI_OPTIONS_KEY = [
  'allowPrivate',
  'debug',
  'dryRun',
  'force',
  'listSchematics',
  'verbose',
  'interactive',
  'workspace',
] as const;

export type CliOptions = Partial<Record<typeof CLI_OPTIONS_KEY[number], boolean>>;

export function parseCliOptions(cliOptions: CliOptions): ParsedCliOptions {
  const debugPresent = cliOptions.debug !== null;
  const debug = debugPresent ? !!cliOptions.debug : undefined;
  const dryRunPresent = cliOptions.dryRun !== null;
  const dryRun = dryRunPresent ? !!cliOptions.dryRun : debug;
  const force = !!cliOptions.force;
  const allowPrivate = !!cliOptions.allowPrivate;
  const interactive = cliOptions.interactive;
  const verbose = cliOptions.verbose;
  return { debugPresent, debug, dryRunPresent, dryRun, force, interactive, allowPrivate, verbose };
}
