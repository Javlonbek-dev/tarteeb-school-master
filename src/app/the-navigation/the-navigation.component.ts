import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-the-navigation',
  templateUrl: './the-navigation.component.html',
  styleUrls: ['./the-navigation.component.scss']
})
export class TheNavigationComponent {

  public users: any = [];

  constructor(private apiService: ApiService, private authService: AuthService){}

  ngOnInit(): void {
    this.apiService.getUsers()
    .subscribe(res =>{
      this.users = res;
    })
  }

  logOut(){
    this.authService.signOut();
  }
}
