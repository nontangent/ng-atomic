import { prompt } from 'inquirer';
import { Command } from 'commander';
import { HistoryService } from '../../services/history';
import { BaseCommand } from '../base';
import { Injectable, Injector } from '@nx-ddd/core';
import { Logger } from '../../logger';
import { SchematicsXCli } from '../../cli';
import { PromptsRegistry } from '../../core/prompts-registry';
import { sleep } from '../../../core/helpers/utils';


@Injectable()
export class InteractiveCommand extends BaseCommand {
  constructor(
    protected history: HistoryService,
    protected logger: Logger,
    protected promptsRegistry: PromptsRegistry,
    protected injector: Injector,
  ) {
    super();
  }

  register(program: Command): void {
    program
      .command('interactive', { isDefault: true })
      .description('Interactive mode')
      .action(() => this.action());
  }

  async action() {
    while(true) {
      // MEMO(nontangent): Add Micro Task for ErrorHandling;
      await sleep(0);
      await prompt({type: 'suggest' as any, name: 'commands'})
        .then(({commands}) => {
          console.debug('commands:', commands);
          return this.runCommands(commands)
        })
        .catch((error) => this.handleError(error));
    }
  }

  protected handleError(error: any) {
    if (error?.code === 'commander.help') return;
    console.error(error);
  }

  protected async runCommands(commands: string) {
    const program = new Command()
      .exitOverride((error) => { throw error })
      .on('command:*', () => program.help());
    const cli = new SchematicsXCli(program, this.history, this.logger);
    cli.registerSchematicsCommand();

    await cli.parse([,, ...parseString(commands)]);
  }
}

function parseString(str: string): string[] {
  const result: string[] = [];
  let current = '';
  let isQuoted = false;
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === ' ' && !isQuoted) {
      result.push(current);
      current = '';
    } else if (char === "'") {
      isQuoted = !isQuoted;
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}
