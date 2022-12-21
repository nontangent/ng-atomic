import { prompt, registerPrompt } from 'inquirer';
import { Command } from 'commander';
import { SuggestPresenter, SuggestPrompter, SuggestPrompterFactory } from '../../prompters';
import { AdaptInquirer } from '../../adapters/inquierer';
import { HistoryService } from '../../services/history';
import { SchematicsXCli } from '../../cli';
import { BaseCommand } from '../base';
import { Injectable, Injector, resolveAndCreate } from '@nx-ddd/core';
import { Provider } from '@nx-ddd/core/di/interface/provider';
import { SuggestService } from '../../services/suggest';

export function createInjector(providers: Provider[] = [], parentInjector?: Injector) {
  return resolveAndCreate(providers, parentInjector);
}


@Injectable()
export class InteractiveCommand extends BaseCommand {
  constructor(
    protected history: HistoryService,
    protected suggestPrompterFactory: SuggestPrompterFactory
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
    const cli = new SchematicsXCli(program, this.history);
    cli.registerSchematicsCommand();

    await cli.parse([,, ...commands.split(' ').filter(command => command !== '')]);
  }
}
