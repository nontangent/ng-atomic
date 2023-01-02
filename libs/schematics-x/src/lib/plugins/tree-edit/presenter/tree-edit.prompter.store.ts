import { Injectable } from "@nx-ddd/core";
import { filter, ReplaySubject, take, tap } from "rxjs";
import { Logger } from "../../../cli/logger";
import { PrompterStore } from "../../../cli/prompters/base";
import { InputState, InputStore } from "../stores/input";
import { SelectState, TreeSelectStore } from "../stores/select";


export interface State {
  mode: 'select' | 'input';
  select: SelectState;
  input: InputState;
}

@Injectable()
export class TreeEditPrompterStore extends PrompterStore<State> {
  mode$ = this.select(state => state.mode);

  get mode() {
    return this.state.mode;
  }

  constructor(
    public selectStore: TreeSelectStore,
    public inputStore: InputStore,
    public logger: Logger,
  ) {
    super({
      mode: 'select',
      select: selectStore.state,
      input: inputStore.state,
    });

    this.inputStore.input$.pipe(
      filter(() => this.mode === 'input'),
    ).subscribe(input => {
      this.setSelectedTreeName(input);
    });

    this.getSelectState(this.selectStore.state$);
    this.getInputState(this.inputStore.state$);
  }

  setSelectedTreeName = this.updater((state, name: string) => {
    this.selectStore.selectedTree.name = name;
    return {...state};
  })

  getSelectState = this.effect(tap((state: SelectState) => this.patchState({ select: state })));
  getInputState = this.effect(tap((state: InputState) => this.patchState({ input: state })))
}