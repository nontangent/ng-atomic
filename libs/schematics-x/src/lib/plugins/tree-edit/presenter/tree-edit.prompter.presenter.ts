import { Injectable } from "@nx-ddd/core";
import { BasePresenter } from "../../../cli/prompters/base";
import { Cursor, Renderer } from "../../../cli/renderer";
import { State } from "./tree-edit.prompter.store";
import figures from 'figures';
import chalk from 'chalk';
import { SelectableTreeNode as TreeNode } from "../models/tree";
import { Logger } from "../../../cli/logger";
import { omit } from "lodash";

export interface ColorContext {
  selected: string;
  nonSelected: string;
}

@Injectable()
export class TreeEditPrompterPresenter extends BasePresenter<State> {
  constructor(
    protected renderer: Renderer,
    protected logger: Logger,
  ) { super(renderer) }

  protected makeContent(state: State): string {
    this.logger.debug('tree:', state.select.tree);
    return ``;
    // return `${this.SX_SYMBOL} Please select schematics to run.`;
    // return JSON.stringify(state.select.tree.toJson());
    // return state.input.input;
  }

  makeBottomContent(state: State) {
    // this.logger.debug('makeBottomContent is fired!');
    const context = state.mode === 'input' ? {selected: 'white', nonSelected: 'grey'} : {selected: 'yellow', nonSelected: 'white'};

    if (state.mode === 'input') {
      this.renderer.setShift({rows: state.select.selectedTree.index + 1, cols: 0});
    }
    return this.makeTreeLines(state.select.tree, state.select.cursor, context);
  }

  makeTreeLines(node: TreeNode, cursor: Cursor, context: ColorContext) {
    let lines = this.makeLine(node, cursor, context);

    if (node.isExpanded) {
      node.children.forEach((child: TreeNode) => {
        lines += this.makeTreeLines(child, cursor, context);
      });
    }
      
    return lines;
  }

  makeLine(
    node: TreeNode,
    cursor: {rows: number},
    context: ColorContext,
  ): string {
    const checked = node.isSelected ? '[x]' : '[ ]';
    const expanded = node.hasChildren ? node.isExpanded ? figures.arrowDown : figures.arrowRight : ' ';
    const padStart = [...Array(node.depth)].map(() => '  ').join('');
    const content = `${padStart}${expanded} ${checked} ${node.name}\n`;
    if (node.index === cursor.rows - 1) {
      return `${chalk[context.selected](content)}`;
    }
    return `${chalk[context.nonSelected](content)}`;
  }

}
