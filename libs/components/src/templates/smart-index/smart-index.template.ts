import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { FormControl } from '@ngneat/reactive-forms';
import { ActionItem } from '@smooth/domain/models';

export interface Page extends PageEvent { }

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
  queryControl = new FormControl<string>();

  @Input()
  title: string = '';

  @Input()
  items: T[] = [];

  @Input()
  actionItems: ActionItem[] = [];

  @Input()
  globalActionItems: ActionItem[] = [];

  @Input()
  properties: (keyof T)[] =  [];

  @Input()
  selectedIdSet = new Set<string>();

  @Input()
  page!: PageEvent;

  @Input()
  queryPlaceholder = '';

  @Output()
  actionItemClick = new EventEmitter();

  @Output()
  checkboxClick = new EventEmitter<T>();

  @Output()
  pageChange = new EventEmitter<PageEvent>();

}
