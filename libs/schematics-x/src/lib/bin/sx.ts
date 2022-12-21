#!/usr/bin/env node
import { resolve } from "path";
import { findUp } from "@angular/cli/src/utilities/find-up";

function resolveSxPath(workspace: string | null): string {
  if (!workspace) return resolve(__dirname, './schematics-x.js');
  return require.resolve('schematics-x/src/lib/bin/schematics-x.js', {
    paths: [workspace]
  });
}

async function main() {
  const workspace = findUp(['node_modules'], process.cwd());
  const sxPath = resolveSxPath(workspace);
  console.debug('sxPath', sxPath);
  const { main } = require(sxPath);
  main();
}

main();
