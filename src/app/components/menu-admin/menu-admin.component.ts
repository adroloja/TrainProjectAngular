import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent {

  @Output() adminMenu = new EventEmitter<string>();

  setMenu(menu : string){

    this.adminMenu.emit(menu);
  }

}
