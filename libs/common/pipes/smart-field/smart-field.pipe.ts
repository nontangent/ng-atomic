import { Inject, InjectionToken, Optional, Pipe, PipeTransform } from '@angular/core';

interface Option<T> {
  name: string;
  value: T;
}

interface InputField {
  type: 'input';
}

interface DateInputField {
  type: 'date';
}

interface SelectField<T> {
  type: 'select';
  options: Option<T>[];
}

interface MultiSelectField<T> {
  type: 'multi-select';
  options: Option<T>[];
}

type FormField<V> = InputField
  | DateInputField
  | SelectField<V>
  | MultiSelectField<V>;

export type FormFieldMap = Record<string, FormField<any>>;

export const FORM_FIELD_MAP = new InjectionToken<FormFieldMap>('[@ng-atomic] Smart Form Field');

@Pipe({
  name: 'smartField',
  pure: true,
})
export class SmartFieldPipe implements PipeTransform {

  constructor(
    @Optional() @Inject(FORM_FIELD_MAP) private map: Record<string, FormField<any>>
  ) {
    this.map ??= {
      createdAt: { type: 'date' },
      updatedAt: { type: 'date' },
      deletedAt: { type: 'date' },
    };
  }

  transform(key: string): FormField<any> {
    return this.map[key] ?? {type: 'input'};
  }

}
