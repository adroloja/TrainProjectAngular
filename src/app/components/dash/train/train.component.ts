import { Component } from '@angular/core';
import {DataService} from "../../../services/data.service";

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.css']
})
export class TrainComponent {

  listTrain : any[] = [];

  trainNumber: number = 0;
  id : number = 0;
  seats: number = 0;

  p: number = 1;
  pageSize: number = 20;

  modelView : boolean = false;

  display = "none";
  trainId : number = 0;

  constructor(private data : DataService) {  }

  ngOnInit(): void {

    this.data.getTrains().subscribe(reuslt => {

      this.listTrain = reuslt;
    })
  }

  delete(){

    this.data.deleteTrain(this.trainId).subscribe(result => {

      alert(result.message);
      this.refreshList();
      this.display = "none";
    }, error => {
      alert(error.error.message);
    })

  }

  update(){

    if(this.id != 0){

      this.data.updateTrain(this.id, this.trainNumber, this.seats).subscribe(result =>{

        alert(result.message);
        this.refreshList();
        this.modelView = false;

      }, error => {
        alert(error.message);
      })
    }else{

      this.data.addTrain(this.trainNumber, this.seats).subscribe(result => {

        this.refreshList();
        this.modelView = false;
      });
    }

  }

  openModal(train? : any){

    if(train != null){

      this.modelView = true;
      this.trainNumber = train.number;
      this.id = train.id;
      this.seats = train.seats;

    }else{

      this.id = 0;
      this.modelView = true;
      this.trainNumber = 0;
      this.seats = 0;
    }

  }

  refreshList(){
    this.data.getTrains().subscribe(result => {
      this.listTrain = result;
    })
  }

  openModalConfirm(trainId : number) {
    this.display = "block";

    this.trainId = trainId;
  }
  onCloseHandled() {
    this.display = "none";
  }
}
