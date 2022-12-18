import { prompt, registerPrompt } from 'inquirer';
import { Command } from 'commander';
import { registerSchematics } from '../register-schematics';
import { resolve } from 'path';
import { SuggestPrompter } from '../../prompters';
import { AdaptInquirer } from '../../adapters/inquierer';
import { HistoryService } from '../../services/history';

const COLLECTION_JSON_PATH = resolve(__dirname, '../../../../../collection.json');
const COLLECTION = process.env['SX_DEVELOPMENT'] ? COLLECTION_JSON_PATH : 'schematics-x';

const history = new HistoryService();

export async function interactive() {
  registerPrompt('suggest', AdaptInquirer((proxy) => new SuggestPrompter(proxy)));
  
  while(true) {
    try {
      const {commands} = await prompt({
        type: 'suggest' as any,
        name: 'commands',
      });

      const program = new Command();

      program.exitOverride((error) => { throw error });
      registerSchematics(program, {path: COLLECTION_JSON_PATH, name: COLLECTION});
      registerSchematics(program, {
        name: '@schematics/angular',
        path: 'node_modules/@schematics/angular/collection.json', 
      }, true);

      program.on('command:*', () => program.help());

      await history.add(commands);
      await program.parseAsync([,, ...commands.split(' ').filter(command => command !== '')]);
    } catch (error) {
      if (error.code === 'commander.help') {
      } else {
        console.error(error);
      }
    }
  }
}

if (require.main === module) {
  interactive().catch((error) => console.error('ERROR:', error));
}
