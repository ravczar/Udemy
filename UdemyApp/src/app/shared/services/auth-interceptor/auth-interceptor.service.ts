import { exhaustMap, take } from 'rxjs/operators';
import { AuthService } from './../authentication/auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService) { }

  // Add token to all aoutgoing requests!
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe( 
      take(1),
      exhaustMap(user => {
        if(!user){ // only change a token if we have a token
          return next.handle(req);
        }
        const modifiedRequest = req.clone({ params: new HttpParams().set('auth', user.token)})
        return next.handle(modifiedRequest);
      }));

  }
}
