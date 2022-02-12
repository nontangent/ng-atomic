import { DoBootstrap, Injector, NgModule } from "@angular/core";
import { TopNavigatorModule, TopNavigatorOrganism } from ".";

@NgModule({
  imports: [TopNavigatorModule]
})
export class BlankElementModule implements DoBootstrap {
  constructor(private injector: Injector) { }

  ngDoBootstrap() {
    return import('@ng-atomic/common/utils').then(({defineElement}) => {
      return defineElement(this.injector, TopNavigatorOrganism);
    });
  }
}