import { Injectable } from "@nx-ddd/core";
import { Renderer } from "../../renderer";
import chalk from 'chalk';
import figures from 'figures';

@Injectable()
export abstract class BasePresenter<S> {
  constructor(
    protected renderer: Renderer,
  ) { }

  presence(state: S) {
    this.renderer.render({
      content: this.makeContent(state),
      bottomContent: this.makeBottomContent(state),
    });
  }

  protected makeContent(state: S): string {
    return `${chalk.yellow('>')} ${chalk.black.bgYellow.bold(' SX ')}`;
  }

  protected makeBottomContent(state: S): string {
    return '';
  }

  get SX_SYMBOL() {
    return `${chalk.yellow(figures.pointer)} ${chalk.black.bgYellow.bold(' SX ')}`
  }
}