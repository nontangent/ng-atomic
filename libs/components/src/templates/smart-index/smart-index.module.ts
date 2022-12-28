import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoLayoutModule } from '@ng-atomic/components/frames/auto-layout';
import { ScrollModule } from '@ng-atomic/components/frames/scroll';
import { HeaderModule } from '@ng-atomic/components/molecules/header';
import { SmartTableModule } from '@ng-atomic/components/organisms/smart-table';
import { SmartListModule } from '@ng-atomic/components/organisms/smart-list';
import { NavigatorModule } from '@ng-atomic/components/organisms/navigator';
import { PaginatorModule } from '@ng-atomic/components/organisms/paginator';

import { SmartIndexTemplate } from './smart-index.template';


@NgModule({
  declarations: [
    SmartIndexTemplate
  ],
  imports: [
    CommonModule,
    // Frames
    AutoLayoutModule,
    ScrollModule,
    // Organisms
    PaginatorModule,
    SmartTableModule,
    SmartListModule,
    NavigatorModule,
    // Molecules
    HeaderModule,
  ],
  exports: [
    SmartIndexTemplate
  ]
})
export class SmartIndexModule { }
