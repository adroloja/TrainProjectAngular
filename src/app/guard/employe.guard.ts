import { CanActivateFn } from '@angular/router';
import {LoginService} from "../services/login.service";

export const employeGuard: CanActivateFn = (route, state) => {

  const loginService = new LoginService();

  if(loginService.isEmploye()){

    return true;

  }else{

    return false;
  }
};
