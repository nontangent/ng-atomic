import { prompt, registerPrompt } from 'inquirer';
import { Command } from 'commander';
import { Prompter, PrompterModule } from '../../prompter';
import { InquirerAdapter } from '../../adapters/inquirer';
import { HistoryService } from '../../services/history';
import { BaseCommand } from '../base';
import { Injectable, Injector, NxModuleFactory, resolveAndCreate } from '@nx-ddd/core';
import { Provider } from '@nx-ddd/core/di/interface/provider';
import { Logger } from '../../logger';
import { SchematicsXCli } from '../../cli';
import { SxScreen, SX_SCREEN } from '../../renderer';

export function createInjector(providers: Provider[] = [], parentInjector?: Injector) {
  return resolveAndCreate(providers, parentInjector);
}

@Injectable()
export class InteractivePrompterFactory {
  constructor(private injector: Injector) { }

  create(screen: SxScreen) {
    const providers = [{ provide: SX_SCREEN, useValue: screen }];
    const injector = createInjector(providers, this.injector)
    const factory = new NxModuleFactory(PrompterModule);
    const nxModuleRef = factory.create(injector);
    return nxModuleRef.injector.get(Prompter);
  }
}

@Injectable()
export class InteractiveCommand extends BaseCommand {
  constructor(
    protected history: HistoryService,
    protected logger: Logger,
    protected prompterFactory: InteractivePrompterFactory,
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
    registerPrompt('suggest', InquirerAdapter((screen) => {
      return this.prompterFactory.create(screen);
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
