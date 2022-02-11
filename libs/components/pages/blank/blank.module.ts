import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BlankPage } from './blank.page';

const routes: Routes = [{path: '', component: BlankPage}];

@NgModule({
  declarations: [BlankPage],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [BlankPage]
})
export class BlankModule { }