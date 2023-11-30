import {Component,  OnInit} from '@angular/core';
import {DataService} from "../../../services/data.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
// @ts-ignore
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css']
})
export class StationComponent implements OnInit{

  map : mapboxgl.Map;

  modelView : boolean = false;
  updateMode : boolean = false;

  name : string = "";
  lat : number = 0;
  lng : number = 0;
  id : number = 0;

  p: number = 1;
  pageSize: number = 20;

  listStation : any[] = [];
  station : any;

  stationId : number = 0;
  display = "none";

  constructor(private data : DataService) {  }

  ngOnInit(): void {

    this.showStationOnMap();

  }

  create(){
    console.log(this.lat, this.lng)
    this.data.createStation(this.name, this.lat, this.lng).subscribe(result => {

      this.refreshList();
      this.showStationOnMap();
      this.modelView = false;

    }, error => {

      alert(error.error.message);
    });
  }

  update(){

      this.data.updateStation(this.id, this.name).subscribe(result =>{

        alert(result.message);
        //this.refreshList();
        this.showStationOnMap();
        this.modelView = false;

      }, error => {
        alert(error.message);
      });

      this.updateMode = false;
    }


  delete(){

    this.data.deleteStation(this.stationId).subscribe(result =>{

      alert(result.message);
      this.showStationOnMap();
      this.display = "none";
    }, error => {

      alert(error.error.message);
    });
  }

  openModal(station? : any){

    if(station != null){

      this.modelView = true;
      this.name = station.name;
      this.id = station.id;
      this.lat = station.lat;
      this.lng = station.lng;
      this.updateMode = true;

    }else{

      this.id = 0;
      this.modelView = true;
      this.name = "";
      this.lat = 0;
      this.lng = 0;
    }

  }
  refreshList(){
    this.data.getStation().subscribe(result => {
      this.listStation = result
    });
  }

  openModalConfirm(stationId : number) {
    this.display = "block";

    this.stationId = stationId;
  }
  onCloseHandled() {
    this.display = "none";
  }

  showStationOnMap(){

    mapboxgl.accessToken = "pk.eyJ1IjoiYWRyb3lveW8iLCJhIjoiY2xvbHBhc2poMmwwZTJrcndrb2x3cTJ6ZiJ9.xEmHqNo-0-qsC5eDrcAyMA";

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-4.6578367, 37.129136],
      zoom: 9
    });
    this.data.getStation().subscribe(result =>{

      this.listStation = result;

      this.listStation.forEach(n => {
        const marker = new mapboxgl.Marker({
          color: "#000000",
          draggable: false
        }).setLngLat([n.lng, n.lat]);

        const popupContent = document.createElement('div');
        popupContent.innerHTML = `<h5>${n.name}</h5>
                             <button id="deleteButton" class="btn btn-danger">Delete</button>
                             <button id="updateButton" class="btn btn-warning">Update</button>`;

        // @ts-ignore
        popupContent.querySelector('#deleteButton').addEventListener('click', () => {
          this.openModalConfirm(n.id);
        });
        // @ts-ignore
        popupContent.querySelector('#updateButton').addEventListener('click', () => {

          this.lat = n.lat;
          this.lng = n.lng;
          this.openModal(n);
        });

        marker.setPopup(new mapboxgl.Popup().setDOMContent(popupContent));
        marker.addTo(this.map);
      });
    }, error => {

    });
  }
}
