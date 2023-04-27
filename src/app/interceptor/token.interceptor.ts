import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService
    , private toast: NgToastService
    ,private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.authService.getToken();

    if (myToken) {
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${myToken}`}
      })
    }
    
    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.toast.warning({detail: "Warning", summary: "Token is expired, Please SignIn again"});
            this.router.navigate(['signin']);
          }
        }
        return throwError(() => new Error('Some other error occurred'));
      })
    );
  }
}
