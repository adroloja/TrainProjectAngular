import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public openModal : boolean = false;
  public openModelReg : boolean = false;

  public logged : boolean = false;
  public employe : boolean = false;

  name : string = "";

  constructor() { }

  getToken(){

    return localStorage.getItem("token");
  }

  getIdUser(){

    return localStorage.getItem("id");
  }

  loggedOn(){
    this.logged = true;
  }
  loggedOff(){
    this.logged = false;
  }
  isLoged(): boolean {

    const logged = localStorage.getItem("loggin");

    if (logged != null){

      return true;   }
    else{    return false;   }
  }

  setname(name : string){
    this.name = name;
  }
  public loginModalOpen(){
    this.openModelReg = true;
    this.openModal = true;


  }

  loginModalClose(){
    this.openModelReg = false;
    this.openModal = false;
  }

  public regModalOpen(){
    this.openModal = false;

    setTimeout(() =>{

    },111)
    this.openModelReg = true;

  }

  regModalClose(){

    this.openModelReg = false;
  }
  isUser(): boolean {

    const role = localStorage.getItem("role");

    if(role != null){

      if(role == "user"){

        return true;

      }else{

        return  false;
      }
    }else{

      return false;
    }
  }

  isEmploye(): boolean {

    const role = localStorage.getItem("role");

    if(role != null){

      if(role == "employe"){

        return true;

      }else{

        return  false;
      }
    }else{

      return false;
    }
  }
}
