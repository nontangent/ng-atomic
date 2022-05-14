import { Component, Input } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';

@Component({
  selector: 'organisms-text-input-section',
  templateUrl: './text-input-section.organism.html',
  styleUrls: ['./text-input-section.organism.scss']
})
export class TextInputSectionOrganism {
  
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
