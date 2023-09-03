import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponentComponent } from './test-component/test-component.component';
import { BtnComponent } from  './tools/btn/btn.component'
import { FireComponent } from './fire/fire.component';
import { SplitScreenComponent } from './split-screen/split-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponentComponent,
    BtnComponent,
    FireComponent,
    SplitScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
