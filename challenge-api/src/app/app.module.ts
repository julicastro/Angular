import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { FilterByNamePipe } from './pipes/filter-by-name.pipe';
import { FormsModule } from '@angular/forms';
import { HistoryComponent } from './views/history/history.component';
import { CityDetailsComponent } from './views/city-details/city-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FilterByNamePipe,
    HistoryComponent,
    CityDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
