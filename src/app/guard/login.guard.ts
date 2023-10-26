import { CanActivateFn } from '@angular/router';
import {LoginService} from "../services/login.service";

export const loginGuard: CanActivateFn = (route, state) => {

  const loginService = new LoginService();

  if(loginService.isLoged()){
    return true;
  }else{
    return false;
  }

};
