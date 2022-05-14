import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';

@Component({
  selector: 'organisms-card-input-section',
  templateUrl: './card-input-section.organism.html',
  styleUrls: ['./card-input-section.organism.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardInputSectionOrganism {

  @Input()
  control = new FormControl('');

  @Input()
  label = 'カード番号';

  @Input()
  placeholder = 'XXXX-XXXX-XXXX-XXXX';

}
