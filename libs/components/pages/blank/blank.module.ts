import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ElementsModule } from '@ng-atomic/elements';
import { BlankPage } from './blank.page';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [{path: '', component: BlankPage}];

@NgModule({
  declarations: [BlankPage],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [BlankPage]
})
export class BlankModule extends ElementsModule { }