import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../../interfaces/auth-response'
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>( null );

  private APIKey: string = 'AIzaSyCbrDx0TrrY-VfPaCIHj_TU_DbOnmi8SqQ';

  constructor(private httpClient: HttpClient, private router: Router) { }

  signUp( email: string, password: string){
    return this.httpClient.post<AuthResponse>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.APIKey}`,
      {
        email: email, 
        password: password,
        returnSecureToken: true
      }
    )
    .pipe( catchError( this.handleError ), tap( responseData => {
      this.handleAuthentication(
        responseData.email, 
        responseData.localId, 
        responseData.idToken, 
        +responseData.expiresIn
      );
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
    .pipe( catchError( this.handleError ), tap( responseData => {
      this.handleAuthentication(
        responseData.email, 
        responseData.localId, 
        responseData.idToken, 
        +responseData.expiresIn
      );
    }));
  }

  private handleError(errorResponse: HttpErrorResponse){
    let errorMessage = 'An unknown error';

      if(!errorResponse.error || !errorResponse.error.error ){
        // e.g. network message error appeard that not suits HttpErrorResponse body
        return throwError(errorMessage);
      }
      switch (errorResponse.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email exists already';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'Please use a valid password';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'Such e-mail does not exist';
          break;
      }
      return throwError(errorMessage);
  }

  private handleAuthentication (email: string, userId: string, token: string, expiresIn: number){
    const expirationDate = new Date(
      new Date().getTime() + expiresIn * 1000
    );
    const user = new User(
      email, 
      userId, 
      token, 
      expirationDate
    );
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    console.log("DANE Z LOCAL STORAGE");
    console.log(localStorage.getItem('userData'));
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
  }

}
