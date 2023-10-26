import {Component, OnInit} from '@angular/core';
import {DataService} from "../../../services/data.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit{

  trainNumber : number = 0;
  listTrain: any[] = [];

  selectedDate : string = "";

  modelView : boolean = false;
  name : string = "";
  id : number = 0;

  listPassenger : any[] = [];

  p: number = 1;
  pageSize: number = 20;

  constructor(private data : DataService) { }
  ngOnInit(): void {

    this.getTrains();
  }

  delete(id : number){

  }

  update(){

  }

  getPassengers(){

    const day = this.selectedDate.replaceAll("-", "/");

      this.data.getPassengers(this.trainNumber, day).subscribe(result =>{

        this.listPassenger = result;
      });
  }

  getTrains(){

    this.data.getTrains().subscribe(result => {
      this.listTrain = result;
    });
  }

  openModal(station? : any){

    if(station != null){

      this.modelView = true;
      this.name = station.name;
      this.id = station.id;

    }else{

      this.id = 0;
      this.modelView = true;
      this.name = "";
    }

  }
}
