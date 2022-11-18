import { PageEvent } from '@angular/material/paginator';

export interface Page extends PageEvent {
  sortKey: string;
  sortOrder: 'asc' | 'desc';
}

export class Page {
  static from(event: Partial<Page> = {}): Page {
    return Object.assign(new Page(), {
      pageSize: 50,
      pageIndex: 0,
      length: 100,
      ...event
    });
  }

  get start(): number {
    return this.pageIndex * this.pageSize;
  }

  get end(): number {
    return Math.min((this.pageIndex + 1) * this.pageSize, this.length);
  }

  patch(obj: Partial<Page>): Page {
    return Page.from({...this, ...obj});
  }
}
