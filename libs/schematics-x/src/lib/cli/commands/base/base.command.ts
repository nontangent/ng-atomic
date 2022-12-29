import { Command } from "commander";

export abstract class BaseCommand {
  abstract register(program: Command): void;
}

