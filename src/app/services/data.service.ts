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

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  //                                                      STOPS
  //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  getAllStops(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loginS.getToken()}`
    });

    return this.http.get<any[]>(GLOBAL.url + "getAllStops", { headers });
  }
    getTrainsScheudleFromOneStation(stationName: string){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loginS.getToken()}`
    });

    return this.http.post<any[]>(GLOBAL.url + "checktrain", { name: stationName}, { headers });
  }

  getTrainsScheudleFromOneStationByDate(stationName: string, date : string){

    const dateF = date.replaceAll("-", "/");

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loginS.getToken()}`
    });

    return this.http.post<any[]>(GLOBAL.url + "checktrainByDay", { name: stationName, day : dateF }, { headers });
  }


  getStopsTrainFromStartTime(trainNumber : number, startTime : string){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loginS.getToken()}`
    });

    return this.http.post<any[]>(GLOBAL.url + "getStopsTrainFromStartTime", { trainNumber : trainNumber, startTime : startTime}, { headers });

  }
  getStopsTrainFromDay(trainNumber : number, startTime : string){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loginS.getToken()}`
    });

    return this.http.post<any[]>(GLOBAL.url + "getStopsTrainsDay", { trainNumber : trainNumber, startTime : startTime}, { headers });

  }

  createStops(trainId: number, scheduleId : number, stationId : number, time : string){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loginS.getToken()}`
    });

    return this.http.post<any[]>(GLOBAL.url + "createStops", {trainId : trainId, scheduleId : scheduleId, stationId : stationId, time : time }, { headers });
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  //                                                      STATION
  //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  getStation(){

    const token = this.loginS.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[]>(GLOBAL.url + "getStations", { headers });
  }
  updateStation(id : number, name : string){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loginS.getToken()}`
    });

    return this.http.put<any>(GLOBAL.url + "updateStation", { id : id, name : name}, { headers });
  }

  createStation(name : string){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loginS.getToken()}`
    });

    return this.http.post<any>(GLOBAL.url + "addStation", { name : name }, { headers });
  }

  deleteStation(id : number){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loginS.getToken()}`
    });

    return this.http.delete<any>(GLOBAL.url + "deleteStation/" + id, { headers });
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  //                                                      TRAIN
  //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  searchTrain(idStationA : number, idStationB : number, startTime : string, endTime : string){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loginS.getToken()}`
    });

    return this.http.post<any[]>(GLOBAL.url + "searchTrain", { stationId1 : idStationA, stationId2 : idStationB,
      startTime : startTime, endTime : endTime }, { headers });
  }

  getTrains(){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loginS.getToken()}`
    });

    return this.http.get<any[]>(GLOBAL.url + "getAllTrains", { headers });
  }

  addTrain(number : number, seats : number){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loginS.getToken()}`
    });

    return this.http.post<any>(GLOBAL.url + "addTrain", { number : number, seats : number }, { headers });
  }

  deleteTrain(id : number){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loginS.getToken()}`
    });

    return this.http.delete<any>(GLOBAL.url + "deleteTrain/" + id, { headers });
  }

  updateTrain(id : number, number : number, seats : number){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loginS.getToken()}`
    });

    return this.http.put<any>(GLOBAL.url + "updateTrain", { id : id, number : number, seats : seats}, { headers });
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  //                                                      TICKET
  //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  buyTicket(trainNumber : number, idStartStops : number, idEndStops : number, idPassenger : number){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loginS.getToken()}`
    });

    return this.http.post<any[]>(GLOBAL.url + "buyTicket", {trainNumber : trainNumber, idStartStops: idStartStops,
      idEndStops : idEndStops, idPassenger : idPassenger}, { headers });
  }

  getTicketByPassengerAndDay(idPassenger : string, date : string){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loginS.getToken()}`
    });

    return this.http.post<any[]>(GLOBAL.url + "getTicketByIdAndDay", { idPassenger : idPassenger, day : date }, { headers });
  }

  getAllTicket(){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loginS.getToken()}`
    });

    return this.http.get<any[]>(GLOBAL.url + "getAllTicket", { headers });
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  //                                                      PASSENGER
  //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  getPassengers(trainNumber : number, day : string){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loginS.getToken()}`
    });

    return this.http.post<any[]>(GLOBAL.url + "getPassengerTrain", {trainNumber : trainNumber, day : day}, { headers });
  }

  getAllPassengers(){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loginS.getToken()}`
    });

    return this.http.get<any[]>(GLOBAL.url + "getAllPassengers", { headers });
  }

  singUp(username : string, name : string, surname : string, password : string, dateBirth : string, employe : boolean){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loginS.getToken()}`
    });

    return this.http.post<any[]>(GLOBAL.url + "registrer", { username : username, name : name, surname : surname, password : password,
                  dateBirth : dateBirth, employe : employe }, { headers });
  }

  updatePassenger(id : number, username : string, name : string, surname : string, password : string, dateBirth : string, employe : boolean){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loginS.getToken()}`
    });

    return this.http.put<any[]>(GLOBAL.url + "updatePassenger", { id : id, username : username, name : name, surname : surname, password : password,
      dateBirth : dateBirth, employe : employe }, { headers });

  }

  deletePassenger(id : number){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loginS.getToken()}`
    });

    return this.http.delete<any[]>(GLOBAL.url + "deletePassenger/" + id, { headers });
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  //                                                      SCHEDULE
  //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  getAllSchedule(){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loginS.getToken()}`
    });

    return this.http.get<any[]>(GLOBAL.url + "getAllSchedules", { headers });
  }

}
