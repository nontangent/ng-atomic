import { Injectable } from "@nx-ddd/core";
import { Logger } from "../../../../cli/logger";
import { PrompterStore } from "../../../../cli/prompters/base";

export interface InputState {
  input: string;
}

@Injectable()
export class InputStore extends PrompterStore<InputState> {
  input$ = this.select(state => state.input);

  get input() {
    return this.state.input;
  }

  constructor(private logger: Logger) {
    super({ input: '' });
  }

  setInput(input: string) {
    this.patchState({ input });
  }
}
