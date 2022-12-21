import { Injectable } from "@nx-ddd/core";
import { Command } from "commander";
import { BaseCommand } from "../base";
import packageJson from '../../../../../package.json';

@Injectable()
export class VersionCommand extends BaseCommand {
  register(program: Command): void {
    program.version(packageJson.version, '-v, --version', 'output the current version');
  }
}
