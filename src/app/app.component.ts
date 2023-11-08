import {Component, OnInit} from '@angular/core';
import {LoginService} from "./services/login.service";
import {LocationService} from "./services/location.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'FrontTrainProject';

  constructor(private login : LoginService,
              private location : LocationService) {
  }
  ngOnInit(): void {

    this.location.sendLocation();

    if(this.login.isLoged()){

      this.login.logged = true;
    }

    if(localStorage.getItem("role") != null){

      if(localStorage.getItem("role")!.includes("user")){

        this.login.employe = false;
      }else {

        this.login.employe = true;
      }
    }
  }
}
