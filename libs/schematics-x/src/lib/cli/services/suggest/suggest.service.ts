import { Injectable } from "@nx-ddd/core";
import { combineLatest, distinctUntilChanged, filter, map, ReplaySubject, sampleTime, shareReplay, startWith, switchMap } from "rxjs";
import { HistoryService } from "../history";
import { Logger } from "../../logger";
import { CommandEstimator } from "../../../core/estimators/command";
import 'core-js/features/string/replace-all';

const at = (arr: any[], n: number = -100) => {
  if (!arr.length) return '';
  while (n < 0) n += arr.length;
  while (n >= arr.length) n -= arr.length;
  return arr?.[n];
} 

const trimN = (str: string) => str.replaceAll('\n', '');

@Injectable()
export class HistoryEstimator {
  constructor(
    private logger: Logger,
    private estimator: CommandEstimator,
  ) { }

  async estimate(history: string[], prompt = ''): Promise<string[]> {
    this.logger.debug('HistoryEstimator.estimate');
    return this.estimator.estimate(history, prompt);
  }
}

@Injectable()
export class SuggestService {
  private index: number;
  private suggest: string = '';

  prompt$ = new ReplaySubject<string>();
  protected index$ = new ReplaySubject<number>();
  protected history$ = this.history.changes();
  protected estimated$ = combineLatest({
    history: this.history$,
    prompt: this.prompt$.pipe(startWith('')),
  }).pipe(
    sampleTime(2000),
    distinctUntilChanged((cur, pre) => JSON.stringify(cur) === JSON.stringify(pre)),
    filter(({prompt}) => !this.suggest.startsWith(prompt) || prompt === ''),
    switchMap(({history, prompt}) => {
      return this.historyEstimator.estimate(history.slice(-20), prompt)
        .catch((error) => (this.logger.debug('estimatedError:', error?.message), [])
      );
    }),
  );

  protected suggests$ = combineLatest({
    prompt: this.prompt$,
    history: this.history$,
    estimated: this.estimated$.pipe(startWith<string[]>([])),
  }).pipe(
    map(({ prompt, history, estimated }) => ({
      history: history.filter(s => s.startsWith(trimN(prompt))) ?? [],
      estimated: estimated.filter(s => s.startsWith(trimN(prompt))) ?? []
    })),
    shareReplay(1),
  );

  _suggest$ = combineLatest({
    index: this.index$,
    _suggests: this.suggests$,
  }).pipe(
    map(({ index, _suggests: {history, estimated} }) => at([...history, ...estimated], index)),
  );

  suggest$ = combineLatest({
    prompt: this.prompt$,
    suggest: this._suggest$,
  }).pipe(
    map(({ suggest, prompt }) => suggest.slice(prompt.length)),
  );

  constructor(
    protected history: HistoryService,
    protected historyEstimator: HistoryEstimator,
    protected logger: Logger,
  ) {
    this.prompt$.next('');
    this.index$.next(0);
    this.index$.subscribe(index => this.index = index);
    this._suggest$.subscribe(suggest => this.suggest = suggest);
    this.suggests$.subscribe(({history}) => this.index$.next(history.length));
  }

  prev() {
    this.index$.next(this.index - 1);
  }

  next() {
    this.index$.next(this.index + 1);
  }
}
