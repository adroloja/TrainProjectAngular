import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {LoginService} from "../../services/login.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.css']
})
export class BuyTicketComponent implements OnInit{

  listStation : any[] = [];
  listStopStartStation : any[] = [];
  listDestinations : any[] = [];

  stationStart : string = "";
  idstationEnd : number = 0;
  idstationStart : number = 0;
  idtrainNumber : number = 0;

  timeStart : string = "";

  id : string = "";

  step1 : boolean = false;
  step2 : boolean = false;

  constructor(private data : DataService,
              private login : LoginService,
              private route : ActivatedRoute) { }
  ngOnInit(): void {

    this.route.params.subscribe(params => {

      const paramValue = params["param"];
      this.stationStart = paramValue;

      if(paramValue){

        this.getStopsStarStation();

      }else{

        this.step1 = false;
      }

    });

    this.id = this.login.getIdUser()!;

    this.data.getStation().subscribe(result => {

      this.listStation = result;
    });

  }

  getStopsStarStation(){
    this.data.getTrainsScheudleFromOneStation(this.stationStart).subscribe(result =>{

      this.listStopStartStation = result;
      //console.log(result);
      this.step1 = true;
    });
  }

  getEndStops(){

    this.listStopStartStation.forEach(n => {

      if(n.time == this.timeStart){

        this.idstationStart = n.stationStop.id;
        this.idtrainNumber = n.trainStops.number;

        //console.log(this.idstationStart);
        //console.log(this.idtrainNumber);

        this.data.getStopsTrainFromStartTime(n.trainStops.id, this.timeStart).subscribe(result => {

          this.listDestinations = result;
          this.step2 = true;

        });
      }
    });
  }

  buyTicket(idStationEnd : number){

    //console.log(this.idtrainNumber,this.idstationStart, idStationEnd, +this.id);
      this.data.buyTicket(this.idtrainNumber,this.idstationStart, idStationEnd, +this.id).subscribe(result =>{

        alert("The ticket has been bought successfully")

      }, error =>
      alert(error.error));

  }

}
