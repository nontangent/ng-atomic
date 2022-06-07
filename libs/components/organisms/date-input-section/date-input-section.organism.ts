import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';
import dayjs from 'dayjs';

@Component({
  selector: 'organisms-date-input-section',
  templateUrl: './date-input-section.organism.html',
  styleUrls: ['./date-input-section.organism.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {class: 'organism section'},
})
export class DateInputSectionOrganism {
  @Input()
  control = new FormControl<dayjs.Dayjs>();

  @Input()
  label = '';

  @Input()
  placeholder = '';
}
