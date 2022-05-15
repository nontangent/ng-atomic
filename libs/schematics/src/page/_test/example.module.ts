import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ExamplePage } from './example.page';

const routes: Routes = [
  {
    path: '',
    component: ExamplePage,
    // loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  }
];

@NgModule({
  declarations: [
    ExamplePage
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ExamplePage
  ]
})
export class ExampleModule { }
