import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DefaultPipePipe } from './codecraft/testing_classes_and_pipes/default-pipe.pipe';
import { DefaultPipe } from './codecraft/testing_classes_and_pipes/default.pipe';
import { LoginComponent } from './codecraft/tests_with_mocks_and_spies/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    DefaultPipePipe,
    DefaultPipe,
    LoginComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
