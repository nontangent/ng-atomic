import { Route } from "@angular/router";

export const BLANK_ROUTE: Route = {
  path: '',
  loadChildren: () => import('./blank.module').then(m => m.BlankModule),
  data: {isBlank: true},
};
