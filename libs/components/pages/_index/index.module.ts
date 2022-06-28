import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IndexPage } from './index.page';
import { ElementsModule } from '@ng-atomic/elements';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
	{
		path: '',
		component: IndexPage,
		// loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
	}
];

@NgModule({
  declarations: [IndexPage],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [IndexPage]
})
export class IndexModule extends ElementsModule { }