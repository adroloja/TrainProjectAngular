import {Component,  OnInit} from '@angular/core';
import {DataService} from "../../../services/data.service";

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css']
})
export class StationComponent implements OnInit{

  modelView : boolean = false;

  name : string = "";
  id : number = 0;

  p: number = 1;
  pageSize: number = 20;

  listStation : any[] = [];
  station : any;

  constructor(private data : DataService) {  }

  ngOnInit(): void {

    this.data.getStation().subscribe(reuslt => {

      this.listStation = reuslt;
    })
  }

  update(){

    if(this.id != 0){

      this.data.updateStation(this.id, this.name).subscribe(result =>{

        alert(result);
        this.refreshList();
        this.modelView = false;

      }, error => {
        alert(error.message);
      })
    }else{

      this.data.createStation(this.name).subscribe(result => {

        this.refreshList();
        this.modelView = false;
      }, error => {

        alert(error.error.message);
      });
    }

  }

  deleteStation(id : number){

    this.data.deleteStation(id).subscribe(result =>{

      alert(result.message);
      this.refreshList();
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
  refreshList(){
    this.data.getStation().subscribe(result => {
      this.listStation = result
    });
  }
}
