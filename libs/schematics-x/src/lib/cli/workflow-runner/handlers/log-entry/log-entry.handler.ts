import { LogEntry } from "@angular-devkit/core/src/logger";
import { Inject, Injectable, InjectionToken } from "@nx-ddd/core";
import ansiColors from "ansi-colors";

const colors = ansiColors.create();

const COLORS: Record<string, (s: string) => string> = {
  info: (s) => s,
  debug: (s) => s,
  warn: (s) => colors.bold.yellow(s),
  error: (s) => colors.bold.red(s),
  fatal: (s) => colors.bold.red(s),
};

export const STD_OUT = new InjectionToken('[schematics-x] Std Out');
export const STD_ERR = new InjectionToken('[schematics-x] Std Err');

@Injectable()
export class LogEntryHandler {
  constructor(
    @Inject(STD_OUT) protected stdout: NodeJS.WriteStream,
    @Inject(STD_ERR) protected stderr: NodeJS.WriteStream,
  ) { }
    
  handle(entry: LogEntry) {
    const colorize = COLORS[entry.level];
    const output = ['warn', 'fatal', 'error'].includes(entry.level)
      ? this.stderr : this.stdout;
    const chunkSize = 2000;

    let message = entry.message;
    while (message) {
      const chunk = message.slice(0, chunkSize);
      message = message.slice(chunkSize);
      output.write(colorize ? colorize(chunk) : chunk);
    }
    output.write('\n');
  }
}
