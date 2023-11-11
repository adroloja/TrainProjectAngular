import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GLOBAL} from "./GLOBAL";
import {LoginService} from "./login.service";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http : HttpClient,
              private loginS : LoginService) { }

  sendLocation(){
    if(navigator.geolocation){

      navigator.geolocation.getCurrentPosition( (position) => {

        const lat = position.coords.latitude;
        const long = position.coords.longitude;

        //console.log(lat, long);

        this.sendLocationToServer(lat, long).subscribe(result => {


        },error => {

          console.log(error);

        });
      });
    } else {
      console.error('Location is not supported by this browser.');
    }
  }

  sendLocationToServer(lat : number, long : number){

    const id = localStorage.getItem("id");

      return this.http.post(GLOBAL.url + "insertLocation", { id : id, lat : lat, lng : long });
  }
}
