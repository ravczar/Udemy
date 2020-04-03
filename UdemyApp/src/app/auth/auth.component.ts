import { AuthResponse } from './../shared/interfaces/auth-response';
import { Subscription } from 'rxjs';
import { AuthService } from './../shared/services/authentication/auth.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  //@ViewChild('authForm') authForm;
  private authForm: NgForm;
  private apiResponse: AuthResponse;
  private signUpSub: Subscription;
  private signInSub: Subscription;
  isLoginMode = true;
  isLoading: boolean = false;
  error: string;

  constructor( private authService: AuthService) { }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.signUpSub.unsubscribe();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onFormSubmit(form: NgForm) {
    // extra check
    if (form.invalid){ return; }
    // poniższe lub viewchild
    this.authForm = form;
    // wyłuskanie zmiennych
    const email = form.value.email;
    const password = form.value.password;
    
    this.isLoading = true;
    if( this.isLoginMode ) {
      this.signInSub = this.authService.signIn(email, password)
      .subscribe(
        (response) => {
          console.log("Dane logwania (signIn) z serwera:");
          console.log(response);
          this.apiResponse = response;
          this.isLoading = false;
        }, (errorMessage: string) =>{
          console.log("niestety wystąpił błąd signIn");
          console.log(errorMessage);
          this.error = errorMessage;
          this.isLoading = false;
        }
      );
    } else {
      this.signUpSub = this.authService.signUp(email, password)
        .subscribe(
          (response:AuthResponse) => {
            console.log("Dane rejestracji (signUp) z serwera:");
            console.log(response);
            this.apiResponse = response;
            this.isLoading = false;
          }, 
          (errorMessage: string) => {
            console.log("niestety wystąpił błąd signUp")
            console.log(errorMessage);
            this.error = errorMessage;
            this.isLoading = false;
          }
        );     
      }
      form.reset();
  }


}
