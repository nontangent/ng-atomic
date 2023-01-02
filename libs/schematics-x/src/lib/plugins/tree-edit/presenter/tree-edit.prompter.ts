import { Inject, Injectable } from "@nx-ddd/core";
import { KeyBinding } from "../../../cli/core";
import { Logger } from "../../../cli/logger";
import { Renderer, SxScreen, SX_SCREEN } from "../../../cli/renderer";
import { visibleSC } from "../../../cli/utils";
import { reduceTree } from "../models/tree";
import { TreeEditPrompterPresenter } from "./tree-edit.prompter.presenter";
import { TreeEditPrompterStore } from "./tree-edit.prompter.store";

@Injectable()
export class TreeEditPrompter {

  constructor(
    protected presenter: TreeEditPrompterPresenter,
    protected store: TreeEditPrompterStore,
    protected logger: Logger,
    protected renderer: Renderer,
    @Inject(SX_SCREEN) protected screen: SxScreen,
  ) { }

  answer: (answer: any) => void;

  async sxOnInit() {
    this.store.state$.subscribe(state => {
      this.presenter.presence(state);
    });
  }

  async sxOnPrompt(prompt: string) {
    // await sleep(0);
    if (this.store.mode === 'input') {
      this.logger.debug('prompt:', visibleSC(prompt));
      this.store.inputStore.setInput(prompt);
    }
  }

  async sxOnAnswer(answer: string) {
    return this.store.state.select.tree;
  }

  @KeyBinding({name: 'up'})
  onUpKey() {
    if (this.store.mode === 'input') return;
    if (this.store.selectStore.cursor.rows > 1) {
      this.store.selectStore.setCursorRows(this.store.selectStore.cursor.rows - 1);
      this.logger.debug(this.store.selectStore.cursor);
    }
    this.renderer.clearLine();
  }

  @KeyBinding({name: 'down'})
  onDownKey() {
    if (this.store.mode === 'input') return;
    if (this.store.selectStore.cursor.rows < this.store.selectStore.length) {
      this.store.selectStore.setCursorRows(this.store.selectStore.cursor.rows + 1);
      this.logger.debug(this.store.selectStore.cursor);
    }
    this.renderer.clearLine();
  }

  @KeyBinding({name: 'space'})
  onSpaceKey() {
    if (this.store.mode === 'input') return;
    this.store.selectStore.toggleNode();
    this.renderer.clearLine();
  }

  @KeyBinding({name: 'right'})
  onRightKey() {
    if (this.store.mode === 'input') return;
    this.store.selectStore.expandNode();
    this.renderer.clearLine();
  }

  @KeyBinding({name: 'left'})
  onLeftKey() {
    if (this.store.mode === 'input') return;
    this.store.selectStore.collapseNode();
    this.renderer.clearLine();
  }

  @KeyBinding({name: 'a'})
  @KeyBinding({name: 'i'})
  changeToInputMode() {
    if (this.store.mode === 'select') {
      this.renderer.clearLine();
      this.renderer.write(this.store.selectStore.selectedTree.name);
      this.store.patchState({mode: 'input'});
      const node = this.store.selectStore.selectedTree;
      this.screen.setShift({rows: node.index + 1, cols: node.depth * 2 + 6});
    }
  }

  @KeyBinding({name: 'escape'})
  onEscapeKey() {
    if (this.store.mode === 'input') {
      this.renderer.clearLine();
      this.renderer.write('');
      this.store.patchState({mode: 'select'});
      this.screen.setShift({rows: 0, cols: 0});
    }
  }
}