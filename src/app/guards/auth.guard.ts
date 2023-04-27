import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router,
    private toast: NgToastService){

    }

  canActivate() {
    if (this.authService.isLoggedIn()) {
      return true
    }else{
      this.toast.error({detail:"Error", summary: "Please Login First"});
      this.router.navigate(['signin']);
      return false;
    }
  }
}
