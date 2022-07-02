import { CUSTOM_ELEMENTS_SCHEMA, getPlatform, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ElementsLoader } from '@ng-atomic/components/elements.loader';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [
    {
      provide: ElementsLoader, 
      useValue: new ElementsLoader({
        imports: [
          BrowserModule,
          BrowserAnimationsModule,
        ],
        providers: [],
        platformFactory: () => getPlatform(),
      }),
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
