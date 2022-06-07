import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';


@Component({
  selector: 'molecules-chips-input-field',
  templateUrl: './chips-input-field.molecule.html',
  styleUrls: ['./chips-input-field.molecule.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipsInputFieldMolecule {

  @Input()
  control = new FormControl<string>();

  @Input()
  placeholder = 'placeholder';

}
