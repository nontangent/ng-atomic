import { Injectable } from "@nx-ddd/core";
import { Renderer } from "../renderer";
import { State } from "./prompter.store";
import chalk from 'chalk';

@Injectable()
export class Presenter {
  constructor(
    protected renderer: Renderer,
  ) { }

  presence(state: State) {
    const content = state.answer.length ? chalk.cyan(state.answer) : state.prompt;

    this.renderer.render({
      content: `${chalk.black.bgYellow.bold(' SX ')} ${content}`,
      bottomContent: '\n',
    });
  }
}