import { Command } from 'commander';
import { interactive } from './interactive';

export function register(program: Command, name = 'interactive', description = 'Interactive mode') {
  program
    .command(name, { isDefault: true })
    .description(description)
    .action(async () => await interactive())
}
