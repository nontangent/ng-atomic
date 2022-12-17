import inquirer from 'inquirer';
import { Command } from 'commander';
import { registerSchematics } from './register-schematics';
import { resolve } from 'path';
import { stdout } from 'process';
import { SuggestPrompter } from './prompters';
import { AdaptInquirer } from './adapters/inquierer';

const COLLECTION_JSON_PATH = resolve(__dirname, '../../../collection.json');
const COLLECTION = process.env['SX_DEVELOPMENT'] ? COLLECTION_JSON_PATH : 'schematics-x';


async function main() {
  inquirer.registerPrompt('suggest', AdaptInquirer((proxy) => new SuggestPrompter(proxy)));
  
  while(true) {
    try {
      const value = await inquirer.prompt({
        type: 'suggest' as any,
        name: 'kittenName',
        message: 'SX ->',
      });

      const program = new Command();
      program.exitOverride((error) => { throw error });
      registerSchematics(program, COLLECTION_JSON_PATH, COLLECTION);
      program.on('command:*', () => program.help());
      await program.parseAsync([,, ...value.kittenName.split(' ')]);
    } catch (error) {
      if (error.code === 'commander.help') {
      } else {
        console.error(error);
      }
    }
    stdout.write('');
    break;
  }
}

if (require.main === module) {
  main().catch((error) => console.error('ERROR:', error));
}
