import { Component, Input } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';
import * as dayjs from 'dayjs';

@Component({
  selector: 'organisms-date-input-section',
  templateUrl: './date-input-section.organism.html',
  styleUrls: ['./date-input-section.organism.scss']
})
export class DateInputSectionOrganism {

  @Input()
  control = new FormControl<dayjs.Dayjs>();

  @Input()
  label = '';

  @Input()
  placeholder: '';

  ngOnInit() {
    this.control.valueChanges.subscribe(console.debug);
  }

}
