import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GLOBAL} from "./GLOBAL";
import {catchError} from "rxjs";
import {LoginService} from "./login.service";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  token = this.loginS.getToken();
  constructor(private http : HttpClient,
              private loginS : LoginService) {
  }
  login(username : string, password : string){

    return this.http.post<any>(GLOBAL.url + "login", { username : username, password : password});
  }

  getStation(){

    const token = this.loginS.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[]>(GLOBAL.url + "getStations", { headers });
  }

  getTrainsScheudleFromOneStation(stationName: String){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loginS.getToken()}`
    });

    return this.http.post<any[]>(GLOBAL.url + "checktrain", { name: stationName }, { headers });
  }

  searchTrain(idStationA : number, idStationB : number, startTime : string, endTime : string){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loginS.getToken()}`
    });

    return this.http.post<any[]>(GLOBAL.url + "searchTrain", { stationId1 : idStationA, stationId2 : idStationB,
              startTime : startTime, endTime : endTime }, { headers });
  }

  getStopsTrainFromStartTime(trainNumber : number, startTime : string){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loginS.getToken()}`
    });

    return this.http.post<any[]>(GLOBAL.url + "getStopsTrainFromStartTime", { trainNumber : trainNumber, startTime : startTime}, { headers });

  }

  buyTicket(trainNumber : number, idStartStops : number, idEndStops : number, idPassenger : number){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loginS.getToken()}`
    });

    return this.http.post<any[]>(GLOBAL.url + "buyTicket", {trainNumber : trainNumber, idStartStops: idStartStops,
      idEndStops : idEndStops, idPassenger : idPassenger}, { headers });
  }
}
