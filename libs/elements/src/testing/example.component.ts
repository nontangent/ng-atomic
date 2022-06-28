import { Component, Inject, InjectionToken, Optional } from "@angular/core";

export const MESSAGE = new InjectionToken('[@ng-atomic/elements(testing)] Message');

@Component({
  selector: 'example-component',
  template: `<span>{{ message }}</span>`
})
export class ExampleComponent {
  constructor(@Optional() @Inject(MESSAGE) public message: string) {
    this.message ??= 'default';
  }
}
