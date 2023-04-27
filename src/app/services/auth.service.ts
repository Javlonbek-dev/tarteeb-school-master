import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string ='https://localhost:44381/api'
  constructor(private http: HttpClient
    ,private router: Router) { }

  signUp(userObj: any){
    return this.http.post<any>(`${this.baseUrl}/Accounts/SignUp`, userObj)
  }

  login(loginObj: any){
    const { email, password } = loginObj;
    return this.http.get<any>(`${this.baseUrl}/Accounts/Login?email=${email}&password=${password}`);
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['signin'])
  }

  getTeam(){
    return this.http.get<any>(`${this.baseUrl}/Teams`);
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn() : boolean{
    return !!localStorage.getItem('token')
  }
}
