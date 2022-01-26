import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';

@Component({
  selector: 'organisms-select-input-section',
  templateUrl: './select-input-section.organism.html',
  styleUrls: ['./select-input-section.organism.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectInputSectionOrganism<T> {

  @Input()
  label: string = '';

  @Input()
  control = new FormControl<T>();

  @Input()
  options: {name: string, value: T}[] = [];
  
}
