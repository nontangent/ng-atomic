import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IndexPage } from './index.page';

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
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [IndexPage]
})
export class IndexModule { }