import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'organisms-textarea-section',
  templateUrl: './textarea-section.organism.html',
  styleUrls: ['./textarea-section.organism.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaSectionOrganism {

  @Input()
  label = 'label';

}
