import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SmartCrudModule } from '@ng-atomic/components/templates/smart-crud';
import { CommunityPage } from './community.page';

const routes: Routes = [
	{
		path: '',
		component: CommunityPage,
		// loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
	}
];

@NgModule({
  declarations: [
    CommunityPage
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    // Templates
    SmartCrudModule,
  ],
  exports: [
    CommunityPage
  ]
})
export class CommunityModule { }
