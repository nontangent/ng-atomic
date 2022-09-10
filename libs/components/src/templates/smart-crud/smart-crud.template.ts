import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Action, ActionItem } from '@ng-atomic/common/models';
import { FormGroup } from '@ngneat/reactive-forms';

export enum ActionId {
  BACK = '[@ng-atomic/components/templates/smart-crud] Back',
  CREATE = '[@ng-atomic/components/templates/smart-crud] Create',
  UPDATE = '[@ng-atomic/components/templates/smart-crud] Update',
  DELETE = '[@ng-atomic/components/templates/smart-crud] Delete',
}

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
  navigatorMenuItems: ActionItem[] = [{id: ActionId.DELETE, name: '削除'}];

  @Input()
  title: string = 'title';

  @Output()
  action = new EventEmitter<Action>();

  @Output()
  backButtonClick = new EventEmitter();

  @Output()
  createButtonClick = new EventEmitter<void>();

  @Output()
  updateButtonClick = new EventEmitter<void>();

  navigatorLeftItems = [{ id: ActionId.BACK, icon: 'arrow_back' }];

  get actionItems(): ActionItem[] {
    switch (this.mode) {
      case 'create': return [{id: ActionId.CREATE, name: '作成'}];
      case 'update': return [{id: ActionId.UPDATE, name: '更新'}];
    }
  }

  get controls() {
    return Object.entries(this.form.controls);
  }

  trackByIndex = (index: number) => index;

  onAction(action: Action): void {
    switch(action.id) {
      case ActionId.BACK: return this.backButtonClick.emit();
      case ActionId.CREATE: return this.createButtonClick.emit();
      case ActionId.UPDATE: return this.updateButtonClick.emit();
      default: return this.action.emit(action);
    }
  }
}
