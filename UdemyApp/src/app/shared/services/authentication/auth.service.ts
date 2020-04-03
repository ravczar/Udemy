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
  private tokenExpirationTimer: any;

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

  autoSignIn(){
    const userData: {
      email: string, 
      id: string, 
      _token: string, 
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    const isUserLoggedIn:boolean = userData ? true : false;
    if (!isUserLoggedIn){
      return; // nie ma user w local storage
    } else {
      const loadedUser: User = new User(
        userData.email, 
        userData.id, 
        userData._token, 
        new Date(userData._tokenExpirationDate)
      );

      if(loadedUser.token){
        this.user.next(loadedUser);
        // difference in miliseconds
        const expirationDuraiton = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.autoLogout(expirationDuraiton);
      }
    }
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
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
    console.log("DANE Z LOCAL STORAGE");
    console.log(localStorage.getItem('userData'));
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    // czyszczenie timera wylogowywania
    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  // uruchamia licznik do momentu wylogowania
  autoLogout( expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(() => { 
      this.logout() 
    }, expirationDuration);
  }

}
