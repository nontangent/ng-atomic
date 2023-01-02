import { Injectable } from "@nx-ddd/core";
import { Renderer } from "../../cli/renderer";
import { Presenter } from "../../cli/prompters/input/presenter";
import { State } from "../../cli/prompters/input/prompter.store";
import chalk from 'chalk';

@Injectable()
export class HistoryInputPrompterPresenter extends Presenter {
  constructor(renderer: Renderer) { 
    super(renderer);
  }

  protected makeContent(state: State) {
    const content = state.answer.length ? chalk.cyan(state.answer) : state.prompt;
    return `${this.SX_SYMBOL} ${content}`;
  }
}