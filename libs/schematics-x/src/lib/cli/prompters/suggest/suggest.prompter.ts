import { catchError, combineLatest, distinctUntilChanged, filter, map, of, startWith, switchMap, take, takeUntil } from 'rxjs';
import { BasePrompter, Proxy, Status } from '../base';
import { logger } from '../../logger';
import { visibleSC } from '../../utils';
import { SuggestService } from '../../services/suggest';
import { SuggestPresenter } from './suggest.presenter';
import { State } from './suggest.store';


export class SuggestPrompter extends BasePrompter {

  constructor(
    proxy: Proxy,
    private suggest = new SuggestService(),
    private presenter = new SuggestPresenter(),
  ) {
    super(proxy);
  }

  protected suggest$ = this.prompt$.pipe(
    switchMap((prompt) => this.suggest.suggest(prompt).pipe(
      catchError(error => (logger.debug(error), of('')))
    )),
    startWith(''),
  );

  protected answer$ = combineLatest({
    answer: this.validateSuccess$.pipe(map(state => state.value)),
    suggest: this.suggest$,
  }).pipe(map(({answer, suggest}) => `${answer}${suggest}`));

  protected state: State;
  protected state$ = combineLatest({
    status: this.status$.pipe(startWith<Status>('pending')),
    prompt: this.prompt$.pipe(startWith('')),
    suggest: this.suggest$.pipe(startWith('')),
    answer: this.answer$.pipe(startWith(null)),
    debugs: logger.debugs$.pipe(startWith([])),
  });

  protected presence$ = this.state$.pipe(
    map(state => this.presenter.present({...state, cursor: this.cursor})),
    distinctUntilChanged((cur, pre) => JSON.stringify(cur) === JSON.stringify(pre)),
  );

  sxOnInit() {
    super.sxOnInit();
    this.state$.pipe(takeUntil(this.destroy$)).subscribe(state => this.state = {...state, cursor: this.cursor});
    this.presence$.pipe(takeUntil(this.destroy$)).subscribe((data) => this.render(data));
    this.state$.pipe(
      filter(state => state.status === 'answered' && state.answer !== null),
      take(1),
    ).subscribe((state) => this.sxOnDestroy(state));
  }

  sxOnDestroy(state: any): void {
    this.render(this.presenter.present({...state, cursor: this.cursor}));
    super.sxOnDestroy(state);
  }

  protected onTabKeyPress() {
    this.autoComplete();
  }

  protected onUpKeyPress() {
    this.suggest.prev();
  }

  protected onDownKeyPress() {
    this.suggest.next();
  }

  protected onKeyPress() {
    this.write(this.readline);
  }

  private autoComplete() {
    const completed = this.state.prompt + this.state.suggest;
    logger.debug('completed:', visibleSC(completed));
    this.write(completed, true);
  }
}
