import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  username: string | undefined;
  password: string | undefined;

  constructor(private data : DataService,
              private route : Router) { }
  ngOnInit(): void {
  }

  login(){

    this.data.login(this.username!, this.password!).subscribe( request => {

      const role : boolean = request.employe;

      if(role != null){

        if(!role){  this.route.navigate(['/user']); }

        else{ this.route.navigate(['/employe']); }

      }

    }, error => {

      if(error.status === 401){

        alert(error.error);

        }
      });
  }



}
