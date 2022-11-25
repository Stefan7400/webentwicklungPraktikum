import { Component, OnInit } from '@angular/core';
import {BackendService} from "../../services/backend.service";
import {Router} from "@angular/router";

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
  doPasswordsMatchAndValid = false;

  usernameInputString : string = "";
  firstPasswordInputString : string = "";
  secondPasswordInputString : string = "";l



  constructor(private backendService : BackendService, private router : Router) { }

  ngOnInit(): void {
  }

  checkUsername() {
      this.isUsernameValid = false
      this.isUsernameTooShort = this.usernameInputString.length !== 0 && this.usernameInputString.length < 3;
      console.log(this.isUsernameTooShort)
      if(this.isUsernameTooShort){
        this.usernameAlreadyUsed = false;
        return;
      }
      this.backendService.userExists(this.usernameInputString).subscribe(data => {
        this.usernameAlreadyUsed = data;

        if (!data) {
          this.isUsernameValid = true;
        }
      })

  }

  createAccount() {
    console.log("YOOO")
    this.backendService.register(this.usernameInputString,this.firstPasswordInputString);
    this.router.navigate(['/chat'])
  }

  checkFirstPassword() {
    this.isPasswordToShort = this.firstPasswordInputString.length < 9
    this.updateGuard();
  }

  checkSecondPassword(){
    this.doPasswordMatch = this.firstPasswordInputString === this.secondPasswordInputString;
    this.updateGuard();
  }

  updateGuard(){
    this.doPasswordsMatchAndValid = this.doesPasswordMatch && this.isPasswordToShort;


  }

}
