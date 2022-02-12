import { DoBootstrap, Injector, NgModule } from "@angular/core";
import { BlankModule, BlankPage } from ".";

@NgModule({
  imports: [BlankModule]
})
export class BlankElementModule implements DoBootstrap {
  constructor(private injector: Injector) { }

  ngDoBootstrap() {
    return import('@ng-atomic/common/utils').then(({defineElement}) => {
      return defineElement(this.injector, BlankPage);
    });
  }
}