import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'molecules-textarea-field',
  templateUrl: './textarea-field.molecule.html',
  styleUrls: ['./textarea-field.molecule.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {class: 'molecule field'},
})
export class TextareaFieldMolecule {

  @Input()
  label = 'label';

  @Input()
  hint?: string;

  @Input()
  placeholder = 'placeholder';

}
