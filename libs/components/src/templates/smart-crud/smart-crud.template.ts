import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ActionItem, ActionItemEvent } from '@ng-atomic/common/models';
import { FormGroup } from '@ngneat/reactive-forms';

@Component({
  selector: 'templates-smart-crud',
  templateUrl: './smart-crud.template.html',
  styleUrls: ['./smart-crud.template.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {class: 'template'},
})
export class SmartCrudTemplate {

  @Input()
  canBack = false;

  @Input()
  name: string = '';

  @Input()
  form!: FormGroup<any>;

  @Input()
  mode: 'create' | 'update' = 'create';

  @Input()
  menuActionItems: ActionItem[] = [];

  @Output()
  actionItemClick = new EventEmitter<ActionItemEvent>();

  @Output()
  backButtonClick = new EventEmitter();

  @Output()
  createButtonClick = new EventEmitter<void>();

  @Output()
  updateButtonClick = new EventEmitter<void>();

  get title(): string {
    switch (this.mode) {
      case 'create': return `${this.name}の作成`;
      case 'update': return `${this.name}の更新`;
    }
  }

  get actionItems(): ActionItem[] {
    switch (this.mode) {
      case 'create': return [{id: 'create', name: '作成'}];
      case 'update': return [{id: 'update', name: '更新'}];
    }
  }

  get controls() {
    return Object.entries(this.form.controls);
  }

  trackByIndex = (index: number) => index;

  onActionButtonClick([{id}]: [ActionItem]): void {
    switch(id) {
      case 'create': return this.createButtonClick.emit();
      case 'update': return this.updateButtonClick.emit();
    }
  }
}
