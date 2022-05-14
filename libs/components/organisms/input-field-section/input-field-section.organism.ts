import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';

@Component({
  selector: 'organisms-input-field-section',
  templateUrl: './input-field-section.organism.html',
  styleUrls: ['./input-field-section.organism.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {class: 'organism section'}
})
export class InputFieldSectionOrganism {
  @Input()
  label = 'label';

  @Input()
  placeholder = 'placeholder';

  @Input()
  type: 'text' | 'number' | 'password' = 'text';

  @Input()
  hint?: string;

  @Input()
  control = new FormControl('');
}
