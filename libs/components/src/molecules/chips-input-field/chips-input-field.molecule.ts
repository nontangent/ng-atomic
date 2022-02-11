import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl } from '@ngneat/reactive-forms';

@Component({
  selector: 'molecules-chips-input-field',
  templateUrl: './chips-input-field.molecule.html',
  styleUrls: ['./chips-input-field.molecule.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipsInputFieldMolecule implements OnInit {

  _control = new FormControl<string>('');

  @Input()
  control = new FormControl<string>();

  @Input()
  placeholder = '';

  constructor() { }

  ngOnInit(): void {
    this.control.value && this._add(this.control.value);

    this._control.valueChanges.subscribe(() => this.control.setValue(this.chips.join(' ')));
  }

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  chips: string[] = [];

  add(event: MatChipInputEvent): void {
    this._add((event.value || '').trim());
    event.input.value = '';
  }

  remove(chip: string): void {
    const index = this.chips.indexOf(chip);
    index >= 0 && this.chips.splice(index, 1);
    this.control.setValue(this.chips.join(' '));
  }

  private _add(value: string) {
    value && this.chips.push(value);
    this.control.setValue(this.chips.join(' '));
  }

}
