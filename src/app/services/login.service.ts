import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../Login/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  // public singUp(user: User) : Observable<any>{
  //   return this.http.post<any>(
  //     'https://tarteeb.azurewebsites.net/api/Accounts/SignUp',
  //     user
  //   )
  // }

  // public singIn(user: User) : Observable<string>{
  //   return this.http.post('https://tarteeb.azurewebsites.net/api/Accounts/login', user,{
  //     responseType: 'text'
  //   });
  // }

  public singIn(user: User) : Observable<any>{
    return this.http.post<any>(
      'https://tarteeb.azurewebsites.net/api/Accounts/login',
      {email: user.email, password: user.password}
    )
  }
}
