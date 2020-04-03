import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../../interfaces/auth-response'
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private APIKey: string = 'AIzaSyCbrDx0TrrY-VfPaCIHj_TU_DbOnmi8SqQ';

  constructor(private httpClient: HttpClient) { }

  signUp( email: string, password: string){
    return this.httpClient.post<AuthResponse>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.APIKey}`,
      {
        email: email, 
        password: password,
        returnSecureToken: true
      }
    )
    .pipe( catchError( errorResponse => {
      let errorMessage = 'An unknown error';

      if(!errorResponse.error || !errorResponse.error.error ){
        // e.g. network message error appeard that not suits HttpErrorResponse body
        return throwError(errorMessage);
      }
      switch (errorResponse.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email exists already';
          break;
      }
      return throwError(errorMessage);
  }));
  }

  signIn (email: string, password: string){
    return this.httpClient.post<AuthResponse>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.APIKey}`,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
    .pipe( catchError( errorResponse => {
        let errorMessage = 'An unknown error';

        if(!errorResponse.error || !errorResponse.error.error ){
          return throwError(errorMessage);
        }
        switch (errorResponse.error.error.message) {
          case 'INVALID_PASSWORD':
            errorMessage = 'Please use a valid password';
            break;
        }
        return throwError(errorMessage);
    }));
  }

}
