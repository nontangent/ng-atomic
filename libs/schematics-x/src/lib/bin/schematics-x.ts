import { main as schematics } from '@angular-devkit/schematics-cli/bin/schematics';
import { ProcessOutput } from '@angular-devkit/core/node';
import { resolve } from 'path';

export interface MainOptions {
  args: string[];
  stdout?: ProcessOutput;
  stderr?: ProcessOutput;
}

export async function main({
  args,
  stdout = process.stdout,
  stderr = process.stderr,
}: MainOptions): Promise<0 | 1> {
  return schematics({args, stdout, stderr});
}

if (require.main === module) {
  const [schematic, ...args] = process.argv.slice(2);

  main({ args: [`${resolve(__dirname, '../../../collection.json')}:${schematic}`, ...args] })
    .then((exitCode) => (process.exitCode = exitCode))
    .catch((e) => { throw e; });
}
