import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { FormControl } from '@ngneat/reactive-forms';
import { ReplaySubject, takeUntil } from 'rxjs';
import { ChipsManager } from '@ng-atomic/common/services/chips-manager';


@Component({
  selector: 'molecules-chips-input-field',
  templateUrl: './chips-input-field.molecule.html',
  styleUrls: ['./chips-input-field.molecule.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ChipsManager],
})
export class ChipsInputFieldMolecule {

  @Input()
  appearance: MatFormFieldAppearance = 'outline';

  @Input()
  control = new FormControl<string>('');

  @Input()
  floatLabel = 'auto';

  @Input()
  label = 'label';

  @Input()
  hint = 'hint';

  @Input()
  placeholder = 'placeholder';

  @Input()
  separators = [ENTER, COMMA, SPACE] as const;

  private readonly destroy$ = new ReplaySubject<void>(1);

  constructor(
    private cd: ChangeDetectorRef,
    public chipsManager: ChipsManager,
  ) { }

  ngOnInit(): void {
    this.chipsManager.setValue(this.control.value);
    this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.chipsManager.setValue(value);
      this.cd.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  onChiInputTokenEnd(event: MatChipInputEvent): void {
    this.chipsManager.add(event.value);
    this.control.setValue(this.chipsManager.getValue());
    event.input.value = '';
  }

  remove(value: string): void {
    this.chipsManager.remove(value);
    this.control.setValue(this.chipsManager.getValue());
  }
}
