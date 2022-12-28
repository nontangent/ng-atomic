import { prompt, registerPrompt } from 'inquirer';
import { Command } from 'commander';
import { SuggestPrompterFactory } from '../../prompters';
import { AdaptInquirer } from '../../adapters/inquierer';
import { HistoryService } from '../../services/history';
import { SchematicsXCli } from '../../cli';
import { BaseCommand } from '../base';
import { Injectable, Injector, resolveAndCreate } from '@nx-ddd/core';
import { Provider } from '@nx-ddd/core/di/interface/provider';
import { Logger } from '../../logger';

export function createInjector(providers: Provider[] = [], parentInjector?: Injector) {
  return resolveAndCreate(providers, parentInjector);
}


@Injectable()
export class InteractiveCommand extends BaseCommand {
  constructor(
    protected history: HistoryService,
    protected suggestPrompterFactory: SuggestPrompterFactory,
    protected logger: Logger,
  ) {
    super();
  }

  register(program: Command): void {
    program
      .command('interactive', { isDefault: true })
      .description('Interactive mode')
      .action(async () => await this.action());
  }

  async action() {
    registerPrompt('suggest', AdaptInquirer((proxy) => {
      return this.suggestPrompterFactory.create(proxy);
    }));
  
    while(true) {
      await prompt({type: 'suggest' as any, name: 'commands'})
        .then(({commands}) => this.runCommands(commands))
        .catch((error) => this.handleError(error));
    }
  }

  protected handleError(error: any) {
    if (error.code === 'commander.help') return;
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