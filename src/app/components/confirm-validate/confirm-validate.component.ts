import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-confirm-validate',
  templateUrl: './confirm-validate.component.html',
  styleUrls: ['./confirm-validate.component.css']
})
export class ConfirmValidateComponent implements OnInit{

  id : number = 0;
  token : string = "";
  constructor(private data : DataService,
              private router : Router,
              private route : ActivatedRoute) { }
  ngOnInit(): void {

    this.route.params.subscribe(params => {

      this.id = params['id'];
      this.token = params['token'];

      this.data.checkTokenValidation(this.id, this.token).subscribe(result => {

        alert(result.result);

        this.router.navigate(["/"]);

        }, error => {

        console.log(error);
        alert(error.result);
      });
    });

  }

}
