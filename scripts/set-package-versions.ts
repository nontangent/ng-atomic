import { readFileSync, writeFileSync } from 'fs';
import 'core-js/features/string/replace-all';
import glob from 'glob';
import yargs from 'yargs/yargs';

export function setPackageVersion(path: string, version: string, placeholder = '0.0.0-PLACEHOLDER') {
  const content = readFileSync(path).toString();
  writeFileSync(path, (content as any).replaceAll(placeholder, version));
}

function parseVersion(version: string) {
  return /^v[0-9]\.[0-9]\.[0-9]/ ? version.slice(1) : version;
}

const argv = yargs(process.argv.slice(2)).options({
  placeholder: { type: 'string', default: '0.0.0-PLACEHOLDER' },
}).argv;
const version = parseVersion(`${argv._[0]}`);
const placeholder = argv.placeholder;
const files = glob.sync('dist/libs/**/package.json');

for (const file of files) {
  setPackageVersion(file, version, placeholder);
}
