import { Inject, Injectable, InjectionToken, Optional } from "@nx-ddd/core";
import { Command } from "commander";
import { resolve } from "path";
import { registerSchematics } from "./register-schematics";
import { BaseCommand } from "./commands/base";
import { HistoryService } from "./services/history";
import { Logger } from "./logger";

const COLLECTION_JSON_PATH = resolve(__dirname, '../../../collection.json');
const COLLECTION = process.env['SX_DEVELOPMENT'] ? COLLECTION_JSON_PATH : 'schematics-x';

export const CLI_PROGRAM = new InjectionToken('[schematics-x] Cli Program');

@Injectable()
export class SchematicsXCli {
  constructor(
    @Optional() @Inject(CLI_PROGRAM) protected program: Command,
    protected history: HistoryService,
    protected logger: Logger,
  ) {
    this.program ??= new Command();
  }

  register(command: BaseCommand) {
    command.register(this.program);
  }

  registerSchematicsCommand() {
    registerSchematics(this.program, {path: COLLECTION_JSON_PATH, name: COLLECTION});
  }

  registerExternalSchematicsCommand() {
    // registerSchematics(program, {path: 'node_modules/@schematics/angular/collection.json', name: '@schematics/angular'}, true);  
  }

  async parse(argv?: string[]) {
    this.logger.debug('argv:', argv);
    argv && await this.history.add(argv);
    return this.program.parseAsync(argv);
  }
}
