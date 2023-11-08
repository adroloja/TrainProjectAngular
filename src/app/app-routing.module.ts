import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {EmployeComponent} from "./components/employe/employe.component";
import {loginGuard} from "./guard/login.guard";
import {employeGuard} from "./guard/employe.guard";
import {userGuard} from "./guard/user.guard";
import {SearchTrainComponent} from "./components/search-train/search-train.component";
import {BuyTicketComponent} from "./components/buy-ticket/buy-ticket.component";
import {TicketsComponent} from "./components/tickets/tickets.component";
import {ConfirmValidateComponent} from "./components/confirm-validate/confirm-validate.component";

const routes: Routes = [

  {
    path: "", component: HomeComponent
  },
  {
    path: "employe", component: EmployeComponent, canActivate: [loginGuard, employeGuard]
  },
  {
    path: "searchTrain", component: SearchTrainComponent, // canActivate: [loginGuard, userGuard]
  },
  {
    path: "buyTicket", component: BuyTicketComponent, canActivate: [loginGuard, userGuard]
  },
  {
    path: "tickets/:id", component: TicketsComponent, canActivate: [loginGuard, userGuard]
  },
  {
    path: "buyTicket/:param", component: BuyTicketComponent, canActivate: [loginGuard, userGuard]
  },
  {
    path: "confirmValidate/:id/:token", component: ConfirmValidateComponent
  },
  {
    path: '**', redirectTo: "",
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
