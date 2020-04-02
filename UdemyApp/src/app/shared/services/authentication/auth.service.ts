import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../../interfaces/auth-response'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private APIKey: string = 'AIzaSyCbrDx0TrrY-VfPaCIHj_TU_DbOnmi8SqQ';

  constructor(private httpClient: HttpClient) { }

  signUp( email: string, password: string){
    return this.httpClient.post<AuthResponse>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${this.APIKey}`,
      {
        email: email, 
        password: password,
        returnSecureToken: true
      }
    );
  }
}
