import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {UserComponent} from "./components/user/user.component";
import {EmployeComponent} from "./components/employe/employe.component";
import {StationScheduleComponent} from "./components/station-schedule/station-schedule.component";

const routes: Routes = [

  {
    path: "", component: HomeComponent
  },
  {
    path: "user", component: UserComponent
  },
  {
    path: "employe", component: EmployeComponent
  },
  {
    path: "stationSchedule", component: StationScheduleComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
