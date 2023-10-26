import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";
import {RegistredUser} from "../../interfaces/RegistredUser";
import {LoginService} from "../../services/login.service";


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

  stationA : string = "";
  stationB : string = "";
  idStationA : number = 0;
  idStationB : number = 0;

  listStation : any[] = [];

  startDateTime: string = "";
  endDateTime: string = "";

  busqueda : boolean = false;

  resultQuery : any[] = [];

  borderColorFrom : string = "";
  borderColorTo : string = "";
  borderColorTimeA : string = "";
  borderColorTimeB : string = "";


  //public navLog : boolean = false;
  constructor(private data : DataService,
              private route : Router,
              public loginS : LoginService) { }
  ngOnInit(): void {

    this.data.getStation().subscribe(result => {

      this.listStation = result;
    }, error => {
      alert(error.message());
    });
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
        this.loginS.loggedOn();

        if(!role){

          localStorage.setItem("role", "user");
          this.loginS.employe = false;
          //this.route.navigate(['/user']);

        }else{

          localStorage.setItem("role", "employe");
          this.loginS.employe = true;
          this.route.navigate(['/employe']);

        }

      }

      this.loginS.loginModalClose();

    }, error => {

      if(error.status === 401){

        alert(error.message);

        }
      });
  }
  registred(){

    if(this.newUser.password != this.repeatPassword){

      alert("Please, repeat the password.")
      return;
    }

    this.data.singUp(this.newUser.username, this.newUser.name, this.newUser.surname, this.newUser.password, this.newUser.dateOfBirth, false).subscribe(result => {

      alert("Sing up successed");
      this.loginS.openModelReg = false;
      this.loginS.openModal = true;
    });
  }
  setRegistredMode(action : boolean){

    if(action){
      this.registredMode = true;
    }else{
      this.registredMode = false;
    }

  }

  search(){

    this.borderColorFrom = "";
    this.borderColorTo = "";
    this.borderColorTimeA = "";
    this.borderColorTimeB = "";

    if(this.stationA == "" || this.stationB == "" || this.startDateTime == "" || this.endDateTime == ""){

      if(this.endDateTime == ""){

        this.borderColorTimeB = 'red';
      }
      if(this.startDateTime == ""){

        this.borderColorTimeA = 'red';
      }

      if(this.stationA == ""){

        this.borderColorFrom = "red";
      }
      if(this.stationB == ""){

        this.borderColorTo = "red";
      }
      alert("Please, complete all field, Thanks.");
      return;
    }

    this.listStation.forEach(n => {
      if(n.name == this.stationA){

        this.idStationA = n.id;

      }
      if(n.name == this.stationB){

        this.idStationB = n.id;
      }
    });

    this.data.searchTrain(this.idStationA, this.idStationB, this.startDateTime, this.endDateTime).subscribe(result => {

      this.resultQuery = result;

      if(this.resultQuery.length == 0){

        alert("There isn´t any result. Thanks");
      }
    });

    this.busqueda = true;
  }

  goToBuyTicket(trainNumber : number, startStopsId : number, endStopsId : number){

    const id = localStorage.getItem("id");

    if(id == null){

      alert("Please, you must be loggin.")
      return;

    }

      this.data.buyTicket(trainNumber, startStopsId, endStopsId, +id).subscribe(result => {

        console.log(result);
        alert("Buy ticket completed successfully");
      }, error => {

        alert(error.error);
      });
  }



}
