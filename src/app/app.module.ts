import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { EmployeComponent } from './components/employe/employe.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { SearchTrainComponent } from './components/search-train/search-train.component';
import { BuyTicketComponent } from './components/buy-ticket/buy-ticket.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenuAdminComponent } from './components/menu-admin/menu-admin.component';
import { StationComponent } from './components/dash/station/station.component';
import { StopsComponent } from './components/dash/stops/stops.component';
import { TicketComponent } from './components/dash/ticket/ticket.component';
import { PassengerComponent } from './components/dash/passenger/passenger.component';
import {NgxPaginationModule} from "ngx-pagination";
import { TrainComponent } from './components/dash/train/train.component';
import { DashComponent } from './components/dash/dash/dash.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { ScheduleComponent } from './components/dash/schedule/schedule.component';
import { LocationComponent } from './components/dash/location/location.component';
import { ConfirmValidateComponent } from './components/confirm-validate/confirm-validate.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeComponent,
    SearchTrainComponent,
    BuyTicketComponent,
    NavbarComponent,
    MenuAdminComponent,
    StationComponent,
    StopsComponent,
    TicketComponent,
    PassengerComponent,
    TrainComponent,
    DashComponent,
    TicketsComponent,
    ScheduleComponent,
    LocationComponent,
    ConfirmValidateComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
