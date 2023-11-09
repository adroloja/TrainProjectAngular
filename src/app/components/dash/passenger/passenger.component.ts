import {Component, OnInit} from '@angular/core';
import {DataService} from "../../../services/data.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

interface Passenger {

  id : number;
  name : string;
  surname : string;
  username : string;
  employe : boolean;
  password : string;
  dateBirth : string;
  email : string;
}
@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.css']
})
export class PassengerComponent implements OnInit{

  listPassenger : any[] = [];
  idPassenger : number = 0;

  confirmPassword : string = "";

  passenger : Passenger = {

    dateBirth: "",
    employe: false,
    id: 0,
    name: "",
    password: "",
    surname: "",
    username: "",
    email: ""

  }

  modelView : boolean = false;

  p: number = 1;
  pageSize: number = 20;

  passengerId : number = 0;
  display = "none";

  constructor(private data : DataService) { }

  ngOnInit(): void {

    this.data.getAllPassengers().subscribe(result => {

      this.listPassenger = result;
    });

  }

  update(){

    this.data.updatePassenger(this.passenger.id, this.passenger.username,
      this.passenger.name,
      this.passenger.surname,
      this.passenger.password,
      this.passenger.dateBirth,
      this.passenger.employe,
      this.passenger.email).subscribe(result =>{

      this.modelView = false;
      this.refreshPassenger();

    }, error => {

      alert(error.error);
    })


  }

  delete(){

    this.data.deletePassenger(this.passengerId).subscribe(result =>{

      this.modelView = false;
      this.refreshPassenger();
      this.display = "none";
    }, error1 => {
      alert(error1.error);
    });

  }

  createPassenger(){

    if(this.confirmPassword != this.passenger.password){

      alert("The password isn´t the same.")
      return;
    }

    console.log(this.passenger.dateBirth);
    this.data.singUp(this.passenger.username,
                      this.passenger.name,
                      this.passenger.surname,
                      this.passenger.password,
                      this.passenger.dateBirth,
                      this.passenger.employe,
                      this.passenger.email).subscribe(result =>{

      this.modelView = false;
      this.refreshPassenger();
    }, error => {

                        alert(error.error);
    })
  }


  openModal(passenger? : any){

    if(passenger != null){

      this.modelView = true;
      this.idPassenger = passenger.id;

      this.passenger = passenger;

    }else{

      this.passenger = {

        dateBirth: "",
        employe: false,
        id: 0,
        name: "",
        password: "",
        surname: "",
        username: "",
        email: ""
      }
      this.idPassenger = 0;
      this.modelView = true;

    }

  }
  refreshPassenger(){

    this.data.getAllPassengers().subscribe(result => {

      this.listPassenger = result;
    })
  }

  openModalConfirm(passengerId : number) {
    this.display = "block";

    this.passengerId = passengerId;
  }
  onCloseHandled() {
    this.display = "none";
  }

}
