import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-search-train',
  templateUrl: './search-train.component.html',
  styleUrls: ['./search-train.component.css']
})
export class SearchTrainComponent  implements OnInit{

  selectedDate : string = "";
  stationA : string = "";
  listStation : any[] = [];

  resultQuery : any[] = [];

  busqueda : boolean = false;

  constructor(private data : DataService) {  }
  ngOnInit(): void {

    this.data.getStation().subscribe(result => {

      this.listStation = result;
    })
  }

  search(){

    this.busqueda = true;

    this.data.getTrainsScheudleFromOneStationByDate(this.stationA, this.selectedDate).subscribe(result => {
      console.log(result);
      this.resultQuery = result;
    })
  }
}
