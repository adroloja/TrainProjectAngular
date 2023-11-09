import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit{

  listTicket : any[] = [];

  p: number = 1;
  pageSize: number = 5;

  constructor(private data : DataService,
              private route : ActivatedRoute) { }
  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      if(params != null){

        const id = params.get("id");

        this.data.getTicketByUser(+id!).subscribe(result => {

          this.listTicket = result;
          this.listTicket = this.listTicket.reverse();
        });
      }

    });


  }

}
