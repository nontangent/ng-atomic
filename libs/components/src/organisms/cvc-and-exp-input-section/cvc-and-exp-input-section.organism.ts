import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormControl } from '@ngneat/reactive-forms';
import { Option } from '@ng-atomic/components/molecules/select-input-field';

const generateOptions = (n: number, start: number): Option<number>[] => {
  return [...Array(n)].map((_, i) => i + start).map(i => ({name: `${i}`, value: i}));
};

@Component({
  selector: 'organisms-cvc-and-exp-input-section',
  templateUrl: './cvc-and-exp-input-section.organism.html',
  styleUrls: ['./cvc-and-exp-input-section.organism.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvcAndExpInputSectionOrganism {

  yearOptions: Option<number>[] = generateOptions(6, 2022);
  monthOptions: Option<number>[] = generateOptions(12, 1);

  @Input()
  form = new UntypedFormGroup({
    expMonth: new FormControl(12),
    expYear: new FormControl(2022),
    cvc: new FormControl(''),
  });

}
