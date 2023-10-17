import {Component, OnInit} from '@angular/core';
import {LoginService} from "./services/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'FrontTrainProject';

  constructor(private login : LoginService) {
  }
  ngOnInit(): void {

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
