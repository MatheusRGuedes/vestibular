import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { VestibularModule } from './pages/vestibular/vestibular.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    VestibularModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
