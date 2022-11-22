import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isInputValid = false
  isUsernameValid = false
  isPasswordValid = false
  doesPasswordMatch = false
  usernameAlreadyUsed = false
  isPasswordToShort = false
  doPasswordMatch = true
  isUsernameTooShort = false;

  usernameInputString : string = "";
  firstPasswordInputString : string = "";
  secondPasswordInputString : string = "";



  constructor() { }

  ngOnInit(): void {
  }

  checkUsername() {
      this.isUsernameTooShort = this.usernameInputString.length !== 0 && this.usernameInputString.length < 3;
      console.log(this.isUsernameTooShort)
  }

  createAccount() {

  }

  checkFirstPassword() {
    this.isPasswordToShort = this.firstPasswordInputString.length < 9
  }

  checkSecondPassword(){
    this.doPasswordMatch = this.firstPasswordInputString === this.secondPasswordInputString;
  }

}
