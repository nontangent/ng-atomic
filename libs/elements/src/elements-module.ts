import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { defineElements } from './define-elements';

@NgModule({})
export abstract class ElementsModule implements DoBootstrap {
  constructor(protected injector: Injector) { }

  ngDoBootstrap(): void {
    defineElements(this);
  }
}
