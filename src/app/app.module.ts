import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { EmployeComponent } from './components/employe/employe.component';
import { StationScheduleComponent } from './components/station-schedule/station-schedule.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { SearchTrainComponent } from './components/search-train/search-train.component';
import { BuyTicketComponent } from './components/buy-ticket/buy-ticket.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    EmployeComponent,
    StationScheduleComponent,
    SearchTrainComponent,
    BuyTicketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
