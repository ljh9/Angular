import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AlertComponent } from './alert.component';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent, 
    AlertComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent], 
  entryComponents: [AlertComponent]
})
export class AppModule { }
