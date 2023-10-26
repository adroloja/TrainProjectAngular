import { CanActivateFn } from '@angular/router';
import {LoginService} from "../services/login.service";

export const userGuard: CanActivateFn = (route, state) => {

  const loginService = new LoginService();

  if(loginService.isUser()){

    return true;

  }else{

    return false;
  }
};
