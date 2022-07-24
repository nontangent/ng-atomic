import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Action, ActionItem } from '@ng-atomic/common/models';
import { FormControl } from '@ngneat/reactive-forms';

export interface Page extends PageEvent { }

export enum ActionId {
  BACK = '[@ng-atomic/components/templates/smart-crud] Back',
}

export class Page {
  static fromObj(event: PageEvent = {pageSize: 50, pageIndex: 0, length: 100}): Page {
    return Object.assign(new Page(), event);
  }

  get start(): number {
    return this.pageIndex * this.pageSize;
  }

  get end(): number {
    return Math.min((this.pageIndex + 1) * this.pageSize, this.length);
  }

  patch(obj: Partial<PageEvent>): Page {
    return Page.fromObj({...this, ...obj});
  }
}

@Component({
  selector: 'templates-smart-index',
  templateUrl: './smart-index.template.html',
  styleUrls: ['./smart-index.template.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'template' },
})
export class SmartIndexTemplate<T> {

  @Input()
  canBack = false;

  @Input()
  queryControl = new FormControl<string>('');

  @Input()
  title: string = '';

  @Input()
  description?: string;

  @Input()
  items: T[] = [];

  @Input()
  menuItems: ActionItem[] = [];

  @Input()
  globalMenuItems: ActionItem[] = [];

  @Input()
  properties: (keyof T)[] =  [];

  @Input()
  selectedIdSet = new Set<string>();

  @Input()
  sortKey?: string;

  @Input()
  sortOrder?: string;

  @Input()
  page?: PageEvent = {
    pageIndex: 0,
    pageSize: 20,
    length: 100,
  };

  @Input()
  pageSizeOptions: number[] = [5, 10, 25, 100];

  @Input()
  queryPlaceholder = '';

  @Output()
  action = new EventEmitter<Action>();

  @Output()
  backButtonClick = new EventEmitter();

  @Output()
  checkboxClick = new EventEmitter<T>();

  @Output()
  pageChange = new EventEmitter<PageEvent>();

  @Output()
  tableHeaderClick = new EventEmitter<string>();

  navigatorLeftItems = [{ id: ActionId.BACK, icon: 'arrow_back' }];

  onAction(action: Action): void {
    switch(action.id) {
      case ActionId.BACK: return this.backButtonClick.emit();
      default: return this.action.emit(action);
    }
  }
}
