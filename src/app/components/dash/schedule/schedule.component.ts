import {Component, OnInit} from '@angular/core';
import {DataService} from "../../../services/data.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit{

  listSchedule : any[] = [];
  listTrain : any[] = [];

  modelView : boolean = false;

  trainNumber : number = 0;
  id : number = 0;

  p: number = 1;
  pageSize: number = 20;
  constructor(private data : DataService) { }

  ngOnInit(): void {

    this.data.getAllSchedule().subscribe(result => {

      this.listSchedule = result;
    });

    this.data.getTrains().subscribe(result => {

      this.listTrain = result;
    });
  }

  delete(id : number){

    this.data.deleteSchedule(id).subscribe(result => {

      alert("Deleted successfully");
      this.refresh();
    }, error => {

      alert(error.error.message);
    });
  }

  update(){

    this.data.updateSchedule(this.id, this.trainNumber).subscribe(result => {

      alert("Update successfully");
      this.modelView = false;
      this.refresh();
    }, error => {

      alert(error.error.message);
    });

  }

  create(){

    this.data.createSchedule(this.trainNumber).subscribe(result => {

      alert(result.message);
      this.refresh();
      this.modelView = false;
    }, error => {

      alert(error.error.message);
    });
  }


  openModal(schedule? : any){

    if(schedule != null){

      this.modelView = true;
      this.trainNumber = schedule.train.number;
      this.id = schedule.id;

    }else{

      this.id = 0;
      this.modelView = true;
      this.trainNumber = 0;
    }

  }

  refresh(){

    this.data.getAllSchedule().subscribe(result => {

      this.listSchedule = result;
    });
  }
}
