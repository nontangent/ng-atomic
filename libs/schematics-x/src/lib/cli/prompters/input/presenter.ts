import { Injectable } from "@nx-ddd/core";
import { Renderer } from "../../renderer";
import { State } from "./prompter.store";
import chalk from 'chalk';
import { BasePresenter } from "../base";

@Injectable()
export class Presenter extends BasePresenter<State> {
  constructor(
    protected renderer: Renderer,
  ) { super(renderer) }

  presence(state: State) {
    this.renderer.render({
      content: this.makeContent(state),
      bottomContent: '\n',
    });
  }

  protected makeContent(state: State) {
    const content = state.answer.length ? chalk.cyan(state.answer) : state.prompt;
    return `${chalk.black.bgYellow.bold(' SX ')} ${content}`;
  }
}
