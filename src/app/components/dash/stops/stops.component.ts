import {Component, OnInit} from '@angular/core';
import {DataService} from "../../../services/data.service";

@Component({
  selector: 'app-stops',
  templateUrl: './stops.component.html',
  styleUrls: ['./stops.component.css']
})
export class StopsComponent implements OnInit{

  listStops : any[] = [];
  listTrain : any[] = [];
  listStation : any[] = [];
  listSchedule : any[] = [];

  selectedDate : string = "";
  trainNumber : any = 0;
  scheduleId : number = 0;
  timeStops : string = "";
  stationId : number = 0;

  name : string = "";

  p: number = 1;
  pageSize: number = 20;

  modelView : boolean = false;
  newStop : boolean = false;

  display = "none";
  stopId : number = 0;

  constructor(private data : DataService) {
  }
  ngOnInit(): void {

    this.data.getTrains().subscribe(result => {

      const allTrain = {
        number : "All train"
      }
      this.listTrain = result;
      this.listTrain.unshift(allTrain);

    });

    this.data.getAllStops().subscribe(result => {

      this.listStops = result;
    });
  }

  getStops(){

    let date = this.selectedDate.replaceAll("-", "/");
    date = date + " 00:00:00";

    if(this.trainNumber == "All train"){

      this.data.getStopsAllTrainByDay(date).subscribe(result => {

        this.listStops = result;
      })

    }else{

      this.data.getStopsTrainFromDay(this.trainNumber, date).subscribe(result =>{

        this.listStops = result;
      });
    }
  }

  delete(){

    this.data.deleteStops(this.stopId).subscribe(result => {

      alert(result.message);
      this.refreshList();
      this.display = "none";
    }, error => {

      alert(error.error.message);

    });
  }

  newStation(){

    this.newStop = true;

    this.data.getStation().subscribe(result => {

      this.listStation = result;
    });

    this.data.getAllSchedule().subscribe(result => {

      this.listSchedule = result;
    });
  }

  addStation(){

    if(this.trainNumber != 0 && this.scheduleId == 0 && this.stationId != 0 && this.timeStops != ""){

      alert("This train doesn´t have any assigned schedule. You must create a new schedule for this train. Thanks");
      return;
    }

    if(this.trainNumber == 0 || this.scheduleId == 0 || this.stationId == 0 || this.timeStops == ""){

      alert("Please, Complete all fields. Thanks.");
    }
    const time = this.timeStops.replaceAll("-", "/").replace("T", " ");

    this.data.createStops(this.trainNumber, this.scheduleId, this.stationId, time).subscribe(result => {

      this.refreshList();
      this.newStop = false;

    });

  }

  selectSchedule(){

    let link : boolean = false;

    this.listSchedule.forEach(n => {

      if(n.train.id == this.trainNumber){

        link = true;
        this.scheduleId = n.id;
      }
    });

    if(!link){

      this.scheduleId = 0;
    }
  }

  refreshList(){

    this.data.getAllStops().subscribe(result => {

      this.listStops = result;
    });
  }

  closeNewStops(){

    this.newStop = false;
  }

  openModal(stopId : number) {
    this.display = "block";

    this.stopId = stopId;
  }
  onCloseHandled() {
    this.display = "none";
  }
}
