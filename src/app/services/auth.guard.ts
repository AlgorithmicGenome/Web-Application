import {AuthService} from "./auth.service";
import {inject} from "@angular/core";
import {Router} from "@angular/router";


export const authGuard = () => {
  const authService = inject(AuthService); // inject AuthService
  const router = inject(Router); // inject router for navigation

  const isAuthenticated = authService.getIsAuth();

  if(!isAuthenticated){
    router.navigate(['/'])
      .then(() => console.log('Navigation successful'))
      .catch(err => console.error('Navigation error:', err));

  }

  return isAuthenticated;
};
