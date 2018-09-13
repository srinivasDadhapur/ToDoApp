import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodoviewComponent } from './components/todoview/todoview.component';
import { GetlistService } from './services/getlist.service';
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    TodoviewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [GetlistService],
  bootstrap: [AppComponent]
})
export class AppModule { }
