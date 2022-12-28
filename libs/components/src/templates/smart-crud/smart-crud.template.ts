import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Action } from '@ng-atomic/common/models';
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
  title: string = '';

  @Input()
  form!: FormGroup<any>;

  @Input()
  navStartActions: Action[] = [{ id: ActionId.BACK, icon: 'arrow_back' }];

  @Input()
  navEndActions: Action[] = [{id: ActionId.DELETE, name: '削除'}];

  @Input()
  actions: Action[] = [{id: ActionId.CREATE, name: '作成'}];

  @Output()
  action = new EventEmitter<Action>();

  get controls() {
    return Object.entries(this.form.controls);
  }

  trackByIndex = (index: number) => index;
}
