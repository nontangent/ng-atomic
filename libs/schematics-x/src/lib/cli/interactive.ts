import inquirer from 'inquirer';
import { Prompt } from './prompt';

inquirer.registerPrompt('suggest', Prompt);

async function main() {
  while(true) {
    const value = await inquirer.prompt({
      type: 'suggest' as any,
      name: 'kittenName',
      message: 'SX ->',
    })
  }
}

main();
