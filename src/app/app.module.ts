import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './shared/home/home.component';

import { ApiService } from './services/api.service';
import { LoadScriptService } from './services/load-script.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    ApiService,
    LoadScriptService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
