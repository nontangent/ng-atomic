import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';

export interface Option<T> {
  name: string;
  value: T;
}

@Component({
  selector: 'molecules-select-input-field',
  templateUrl: './select-input-field.molecule.html',
  styleUrls: ['./select-input-field.molecule.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {class: 'molecule input-field field'},
})
export class SelectInputFieldMolecule<T> {

  @Input()
  label: string = '';

  @Input()
  control = new FormControl<T>();

  @Input()
  options: Option<T>[] = [];

  value = (item: Option<T>) => item?.value; 

}
