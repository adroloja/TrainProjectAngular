import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-station-schedule',
  templateUrl: './station-schedule.component.html',
  styleUrls: ['./station-schedule.component.css']
})
export class StationScheduleComponent implements OnInit{

  listStation: any[] = [];
  seleccion: string = '';

  constructor( private data : DataService) {  }
  ngOnInit(): void {

    this.data.getStation().subscribe(result => {

      this.listStation = result;
    })
  }

}
