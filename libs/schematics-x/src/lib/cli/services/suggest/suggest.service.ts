import { Injectable } from "@nx-ddd/core";
import { combineLatest, distinctUntilChanged, map, ReplaySubject, sampleTime, shareReplay, startWith, switchMap } from "rxjs";
import { HistoryService } from "../history";
import { Logger } from "../../logger";

const at = (arr: any[], n: number = -100) => {
  if (!arr.length) return '';
  while (n < 0) n += arr.length;
  while (n >= arr.length) n -= arr.length;
  return arr?.[n];
} 

const trimN = (str: string) => {
  return str.replaceAll('\n', '');
}

@Injectable()
export class HistoryEstimator {
  constructor(
    private logger: Logger,
  ) { }

  async estimate(history: string[], prompt = ''): Promise<string[]> {
    this.logger.debug('HistoryEstimator.estimate');
    return ['this is a suggested'];
  }
}

@Injectable()
export class SuggestService {
  private index: number;
  prompt$ = new ReplaySubject<string>();
  index$ = new ReplaySubject<number>();
  history$ = this.history.changes();
  estimated$ = combineLatest({
    history: this.history$,
    prompt: this.prompt$.pipe(startWith('')),
  }).pipe(
    sampleTime(3000),
    distinctUntilChanged((cur, pre) => JSON.stringify(cur) === JSON.stringify(pre)),
    switchMap(({history, prompt}) => this.historyEstimator.estimate(history.slice(-5), prompt)),
  );

  suggests$ = combineLatest({
    prompt: this.prompt$,
    history: this.history$,
    estimated: this.estimated$,
  }).pipe(
    map(({ prompt, history, estimated }) => ({
      history: history.filter(s => s.startsWith(trimN(prompt))) ?? [],
      estimated: estimated.filter(s => s.startsWith(trimN(prompt))) ?? []
    })),
    shareReplay(1),
  );

  suggest$ = combineLatest({
    index: this.index$,
    suggests: this.suggests$,
    prompt: this.prompt$,
  }).pipe(
    map(({ index, suggests: {history, estimated}, prompt }) => {
      return at([...history, ...estimated], index).slice(prompt.length);
    }),
  );

  constructor(
    protected history: HistoryService,
    protected historyEstimator: HistoryEstimator,
  ) {
    this.index$.next(0);
    this.index$.subscribe(index => this.index = index);
    this.suggests$.subscribe(({history}) => this.index$.next(history.length));
  }

  prev() {
    this.index$.next(this.index - 1);
  }

  next() {
    this.index$.next(this.index + 1);
  }
}
