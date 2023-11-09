import {AfterViewInit, Component, OnInit} from '@angular/core';
// @ts-ignore
import * as mapboxgl from 'mapbox-gl';
import {DataService} from "../../../services/data.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit{

  map : mapboxgl.Map;

  listLocations : any[] = [];

  listPassenger : any[] = [];
  startDay : string = "";
  endDay : string = "";
  passengerId : number = 0;

  listStations : any[] = [];

  constructor(private data : DataService) {  }
  ngOnInit(){

    mapboxgl.accessToken = "pk.eyJ1IjoiYWRyb3lveW8iLCJhIjoiY2xvbHBhc2poMmwwZTJrcndrb2x3cTJ6ZiJ9.xEmHqNo-0-qsC5eDrcAyMA";

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-4.6578367, 37.129136],
      zoom: 9
    });

    this.data.getStation().subscribe(result =>{

      this.listStations = result;

      this.listStations.forEach(n => {

        new mapboxgl.Marker({
          color: "#000000",
          draggable: false
        }).setLngLat([n.lng, n.lat])
          .setPopup(new mapboxgl.Popup().setHTML(`<h5>${n.name}</h5>`))
          .addTo(this.map);
      });
    }, error => {

    });


    this.data.getAllPassengers().subscribe(result => {

      this.listPassenger = result.sort((a, b) => {
        if (a.name === "unknown" && b.name !== "unknown") {
          return -1;
        } else if (a.name !== "unknown" && b.name === "unknown") {
          return 1;
        } else {
          return a.name.localeCompare(b.name);
        }
      });
    })

  }
  show(){

    this.data.getLocationByUserBetweenDays(this.passengerId, this.startDay, this.endDay).subscribe(result => {

      mapboxgl.accessToken = "pk.eyJ1IjoiYWRyb3lveW8iLCJhIjoiY2xvbHBhc2poMmwwZTJrcndrb2x3cTJ6ZiJ9.xEmHqNo-0-qsC5eDrcAyMA";

      const lastItem = result[result.length - 1];

     if(lastItem != null){

       this.map = new mapboxgl.Map({
         container: 'map',
         style: 'mapbox://styles/mapbox/streets-v11',
         center: [lastItem.lng, lastItem.lat],
         zoom: 9
       });
     }else{

       this.map = new mapboxgl.Map({
         container: 'map',
         style: 'mapbox://styles/mapbox/streets-v11',
         center: [-4.6578367, 37.129136],
         zoom: 9
       });
     }

      this.listStations.forEach(n => {

        new mapboxgl.Marker({
          color: "#000000",
          draggable: false
        }).setLngLat([n.lng, n.lat])
          .setPopup(new mapboxgl.Popup().setHTML(`<h5>${n.name}</h5>`))
          .addTo(this.map);
      });

      this.listLocations = result;
      this.listLocations.forEach( point => {


        const fechaComoFecha = new Date(point.createdAt);
        const opciones = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };

        const day = fechaComoFecha.getDate().toString().padStart(2, '0');
        const month = (fechaComoFecha.getMonth() + 1).toString().padStart(2, '0');
        const year = fechaComoFecha.getFullYear();
        const hours = fechaComoFecha.getHours().toString().padStart(2, '0');
        const min = fechaComoFecha.getMinutes().toString().padStart(2, '0');
        const sec = fechaComoFecha.getSeconds().toString().padStart(2, '0');

        const fechaFormateada = `${day}-${month}-${year} ${hours}:${min}:${sec}`;

        new mapboxgl.Marker({
          color: "#e74c3c",
          draggable: false
        }).setLngLat([point.lng, point.lat])
          .setPopup(new mapboxgl.Popup().setHTML(`<h5>User: ${point.passenger.name}</h5>
                                                  <br><h6>Time: ${fechaFormateada}</h6>`))
          .addTo(this.map);


      });
    });
  }

}
