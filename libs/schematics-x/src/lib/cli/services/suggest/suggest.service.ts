import { combineLatest, map, Observable, ReplaySubject } from "rxjs";
import { HistoryService } from "../history";

const at = (arr: any[], n: number = -100) => {
  if (!arr.length) return '';
  while (n < 0) n += arr.length;
  while (n >= arr.length) n -= arr.length;
  return arr?.[n];
} 

const trimN = (str: string) => {
  return str.replaceAll('\n', '');
}


export class SuggestService {
  private index: number;
  index$ = new ReplaySubject<number>();

  constructor(
    protected history = new HistoryService(),
  ) {
    this.index$.next(0);
    this.index$.subscribe(index => this.index = index);
  }

  protected async getSuggestions(prompt: string): Promise<string[]> {
    return this.history.list();
  }

  async _suggest(prompt: string): Promise<string[]> {
    const suggestions = await this.getSuggestions(prompt);
    return suggestions.filter(s => s.startsWith(trimN(prompt))) ?? [];
  }

  suggest(prompt: string): Observable<string> {
    return combineLatest({
      index: this.index$,
      suggest: this._suggest(prompt),
    }).pipe(
      map(({ index, suggest }) => at(suggest, index).slice(prompt.length)),
    );
  }

  prev() {
    this.index$.next(this.index - 1);
  }

  next() {
    this.index$.next(this.index + 1);
  }
}
