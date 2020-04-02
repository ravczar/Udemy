import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  @ViewChild('authForm') authForm;
  private authForm2: NgForm;
  public credentials: {email: string, password: string};

  constructor() { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onFormSubmit(form: NgForm) {
    this.authForm2 = form;
    console.log(this.authForm2.value);
    this.credentials = this.authForm2.value;
    console.log(this.credentials);
    this.authForm2.reset();
  }
}
