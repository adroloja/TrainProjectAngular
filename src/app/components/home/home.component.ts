import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";
import {RegistredUser} from "../../interfaces/RegistredUser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  newUser: RegistredUser = {
    username : "",
    password: "",
    dateOfBirth: "",
    name: "",
    surname: "",
  };

  username: string | undefined;
  password: string | undefined;
  repeatPassword: string | undefined;
  registredMode: boolean = false;


  constructor(private data : DataService,
              private route : Router) { }
  ngOnInit(): void {
  }

  login(){

    this.data.login(this.username!, this.password!).subscribe( request => {

      const role : boolean = request.passenger.employe;

      if(request.token != null) {

        localStorage.setItem("token", request.token);
        localStorage.setItem("id", request.passenger.id);

      }

      if(role != null){

        localStorage.setItem("loggin", "ok");

        if(!role){

          localStorage.setItem("role", "user");
          this.route.navigate(['/user']);

        }else{

          localStorage.setItem("role", "employe");
          this.route.navigate(['/employe']);

        }

      }

    }, error => {

      if(error.status === 401){

        alert(error.error);

        }
      });
  }
  registred(){

    console.log(this.newUser);

  }
  setRegistredMode(action : boolean){

    if(action){
      this.registredMode = true;
    }else{
      this.registredMode = false;
    }

  }


}
