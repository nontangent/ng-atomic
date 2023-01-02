#!/usr/bin/env node
import { resolve } from "path";
import { findUp } from "@angular/cli/src/utilities/find-up";
import { GlobalProvidersManager } from "../core";
import { SX_PATH } from "../cli/prompters";
import { config } from "rxjs";
import { logger } from "../cli/logger";

config.onUnhandledError = logger.error;

function resolveSxPath(workspace: string | null): string {
  if (!workspace) return resolve(__dirname, './schematics-x.js');
  const path = require.resolve('schematics-x/src/lib/bin/schematics-x.js', {
    paths: [workspace]
  });

  return path || resolve(__dirname, './schematics-x.js');
}

async function main() {
  const workspace = findUp(['node_modules'], process.cwd());
  const sxPath = resolveSxPath(workspace);
  GlobalProvidersManager.register([
    { provide: SX_PATH, useValue: sxPath },
  ]);
  await require(sxPath).main();
}

main();
