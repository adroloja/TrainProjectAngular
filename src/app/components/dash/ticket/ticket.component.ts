import {Component, OnInit} from '@angular/core';
import {DataService} from "../../../services/data.service";

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent  implements OnInit{

  listTicket : any[] = [];
  listPassenger : any[] = [];
  listStation : any[] = [];

  listStopStartStation : any[] = [];
  listDestinations : any[] = [];
  idstationStart : number = 0;
  idtrainNumber : number = 0;

  selectedDate: string = "";
  passengerName : string = "";

  p: number = 1;
  pageSize: number = 20;

  modelView : boolean = false;
  newTicket : boolean = false;

  name : string = "";

  passengerId : number = 0;
  stationAName : string = "";
  stationBId : number = 0;
  timeStops : string = "";


  constructor(private data : DataService) {  }

  ngOnInit(): void {

      this.data.getStation().subscribe(result => {

        this.listStation = result;
      });

      this.data.getAllTicket().subscribe(result => {

        this.listTicket = result;
      });

      this.data.getAllPassengers().subscribe(result => {

        let aux : any[] = [];

        result.forEach(n =>{

          if(!n.employe){

            aux.push(n);
          }
        });

        const listOrder = aux.sort((a,b) => {
          return a.name.localeCompare(b.name);
        });

        this.listPassenger = listOrder;
      })
  }
  getEndStops(){

    this.listStopStartStation.forEach(n => {

      if(n.time == this.timeStops){

        this.idstationStart = n.id;
        this.idtrainNumber = n.trainStops.number;
        this.data.getStopsTrainFromStartTime(n.trainStops.id, this.timeStops).subscribe(result => {

          console.log(result);
          this.listDestinations = result;

        });
      }
    });
  }

  getStopsStarStation(){

    this.data.getTrainsScheudleFromOneStation(this.stationAName).subscribe(result =>{

      this.listStopStartStation = result;

    });
  }
  getTicket(){

    let date = this.selectedDate.replaceAll("-", "/");

    date = date + " 00:00:00"


      this.data.getTicketByPassengerAndDay(this.passengerName, date).subscribe(result => {

        this.listTicket = result;
      });

  }

  addTicket(){

    console.log(this.idtrainNumber,this.idstationStart, this.stationBId, this.passengerId);


    this.data.buyTicket(this.idtrainNumber,this.idstationStart, this.stationBId, this.passengerId).subscribe(result =>{

      alert("The ticket has been bought successfully")
      this.refresh();

    }, error =>
      alert(error.error));
  }

  delete(id : number){

    this.data.deleteTicket(id).subscribe(result => {

      alert(result.message);
      this.refresh();
    }, error => {

      alert(error.error);
    });
  }

  update(){

  }

  refresh(){

    this.data.getAllTicket().subscribe(result => {

      this.listTicket = result;
    });
  }

  closeNewTicket(){

    this.newTicket = false;
  }

  openNewsTicket(){

    this.newTicket = true;
  }
}
