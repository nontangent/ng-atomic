import { prompt, registerPrompt } from 'inquirer';
import { Command } from 'commander';
import { registerSchematics } from '../register-schematics';
import { resolve } from 'path';
import { SuggestPrompter } from '../../prompters';
import { AdaptInquirer } from '../../adapters/inquierer';

const COLLECTION_JSON_PATH = resolve(__dirname, '../../../../../collection.json');
const COLLECTION = process.env['SX_DEVELOPMENT'] ? COLLECTION_JSON_PATH : 'schematics-x';

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
      registerSchematics(program, COLLECTION_JSON_PATH, COLLECTION);
      program.on('command:*', () => program.help());

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