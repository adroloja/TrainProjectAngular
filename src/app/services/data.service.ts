import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GLOBAL} from "./GLOBAL";
import {catchError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http : HttpClient) {
  }
  login(username : string, password : string){

    return this.http.post<any>(GLOBAL.url + "login", { username : username, password : password});
  }

  getStation(){

    return this.http.get<any[]>(GLOBAL.url + "getStation");
  }
}
