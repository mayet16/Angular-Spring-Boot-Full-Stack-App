import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from "./AuthService";
const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.authService.getToken();
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];

/*import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { AuthService } from "./AuthService";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> 
    { 
        var authToken = this.authService.getToken();
        console.log(authToken)
        req = req.clone({
            setHeaders: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer "+authToken
            }
            // headers: new HttpHeaders({
            //     'Content-Type':  'application/json',
            //     'Authorization': 'Bearer '+authToken
            //   })
            // });

        });
        // const authReq = req.clone({ setHeaders: { Authorization: "Bearer "+authToken } });
     return next.handle(req);
    }
    
}*/