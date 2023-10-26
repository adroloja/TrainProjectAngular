import { Component } from '@angular/core';
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public loginS : LoginService,
              private router: Router) {
  }

  openModal(){

    this.loginS.loginModalOpen();
  }
  closeModal(){ this.loginS.loginModalClose()}

  openReg(){
    this.loginS.regModalOpen();
  }

  closeReg(){
    this.loginS.regModalClose();
  }
  redirectToTickets(){

    const id = localStorage.getItem("id");
    this.router.navigate(["/tickets", id]);
  }
  redirect(){
    if(!this.loginS.logged){

      alert("You must be logged in to enter. Thanks.")
      this.router.navigate(["/"]);
    }
  }
  closeSession(){

    this.loginS.logged = false;
    this.loginS.employe = false;
    localStorage.removeItem("loggin");
    localStorage.removeItem("token");
    localStorage.removeItem("id");

    this.router.navigate(["/"])
  }
}
