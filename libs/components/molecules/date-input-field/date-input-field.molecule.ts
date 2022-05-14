import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';
import { Dayjs } from 'dayjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'molecules-date-input-field',
  templateUrl: './date-input-field.molecule.html',
  styleUrls: ['./date-input-field.molecule.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {class: 'molecule field'},
})
export class DateInputFieldMolecule {
  control = new FormControl<Dayjs>();

  @Input('control')
  private _control = new FormControl<Dayjs>();

  @Input()
  label = '';

  @Input()
  placeholder = '';

  @Input()
  hint?: string;

  ngOnInit(): void {
    this.control.valueChanges.pipe(
      filter(value => this._control.value !== value),
    ).subscribe(value => this._control.setValue(value));

    this._control.valueChanges.subscribe(value => this.control.setValue(value));
    this.control.setValue(this._control.value);
  }
}
