import { Injectable } from "@nx-ddd/core";
import { Command } from "commander";
import { prompt } from "inquirer";
import { BaseCommand } from "../base";

@Injectable()
export class ChainCommand extends BaseCommand {
  register(program: Command): void {
    program
      .command('chain', { isDefault: true })
      .description('Interactive mode')
      .action(() => this.action());
  }

  async action() {
    await prompt({type: 'tree-edit' as any, name: 'result'})
      .then(({result}) => console.log('result:', result));
      // .catch((error) => this.handleError(error));
  }

}
