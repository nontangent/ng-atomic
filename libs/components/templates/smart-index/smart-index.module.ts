import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoLayoutModule } from '@ng-atomic/components/frames/auto-layout';
import { ScrollModule } from '@ng-atomic/components/frames/scroll';
import { SmartTableModule } from '@ng-atomic/components/organisms/smart-table';
import { BackNavigatorModule } from '@ng-atomic/components/organisms/back-navigator';
import { PaginatorModule } from '@ng-atomic/components/organisms/paginator';
import { ElementsModule } from '@ng-atomic/elements';

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
    BackNavigatorModule,
  ],
  exports: [
    SmartIndexTemplate
  ]
})
export class SmartIndexModule extends ElementsModule { }
