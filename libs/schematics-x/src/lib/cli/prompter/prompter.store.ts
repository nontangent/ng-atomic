import { Injectable } from "@nx-ddd/core";
import { combineLatest, ReplaySubject, startWith } from "rxjs";

export interface State {
  prompt: string;
  answer: string;
}

@Injectable()
export class PrompterStore {
  protected prompt$ = new ReplaySubject<string>(1);
  protected answer$ = new ReplaySubject<string>(1);

  state$ = combineLatest({
    prompt: this.prompt$.pipe(startWith('')),
    answer: this.answer$.pipe(startWith('')),
  });

  constructor() {}

  setPrompt(prompt: string) {
    this.prompt$.next(prompt);
  }

  setAnswer(answer: string) {
    this.answer$.next(answer);
  }
}
