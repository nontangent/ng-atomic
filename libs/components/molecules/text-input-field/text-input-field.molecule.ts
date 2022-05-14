import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';

@Component({
  selector: 'molecules-text-input-field',
  templateUrl: './text-input-field.molecule.html',
  styleUrls: ['./text-input-field.molecule.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {class: 'molecule field'},
})
export class TextInputFieldMolecule {

  @Input()
  type: 'text' | 'number' | 'password' = 'text';

  @Input()
  name?: string;

  @Input()
  label = 'label';

  @Input()
  control = new FormControl<string | number>();

  @Input()
  placeholder = 'placeholder';

  @Input()
  hint?: string;

}
