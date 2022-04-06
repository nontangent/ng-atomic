import { Route } from "@angular/router";

export const BLANK_ROUTE: Route = {
  path: '',
  loadChildren: () => import('@ng-atomic/components/pages/blank').then(m => m.BlankModule),
  data: {isBlank: true},
};
