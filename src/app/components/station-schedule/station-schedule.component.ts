import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-station-schedule',
  templateUrl: './station-schedule.component.html',
  styleUrls: ['./station-schedule.component.css']
})
export class StationScheduleComponent implements OnInit{

  listStation: any[] = [];
  selection: string = '';

  resultQuery: any[] = [];

  constructor( private data : DataService) {  }
  ngOnInit(): void {

    this.data.getStation().subscribe(result => {

      this.listStation = result;
    })
  }

  getStationTrainSchedule(){

    this.data.getTrainsScheudleFromOneStation(this.selection).subscribe(result => {

      console.log(result);

      this.resultQuery = result;

      this.resultQuery.forEach(n => {



      })

    }, error =>
    {
      alert(error.error);

    });
  }


}
