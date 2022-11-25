import { Component, OnInit } from '@angular/core';
import {BackendService} from "../../services/backend.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isUsernameValid = false
  doesPasswordMatch = false
  usernameAlreadyUsed = false
  isPasswordToShort = false
  doPasswordMatch = true
  isUsernameTooShort = false;
  doPasswordsMatchAndValid = false;

  usernameInputString : string = "";
  firstPasswordInputString : string = "";
  secondPasswordInputString : string = "";

  activated : boolean = false;



  constructor(private backendService : BackendService, private router : Router) { }

  ngOnInit(): void {
  }

  checkUsername() {
      this.activated = false;
      this.isUsernameValid = false
      this.isUsernameTooShort = this.usernameInputString.length !== 0 && this.usernameInputString.length < 3;
      if(this.isUsernameTooShort){
        return;
      }
      this.backendService.userExists(this.usernameInputString).subscribe(data => {
        this.usernameAlreadyUsed = data;

        if(!data){
          this.isUsernameValid = true;
        }
      })

  }

  createAccount(event: MouseEvent) {
    console.log(this.activated)
    if(!this.activated){
      event.preventDefault();
      return;
    }


    this.backendService.register(this.usernameInputString,this.firstPasswordInputString).subscribe(done => {
      if(done){
        this.router.navigate(['/chat'])
      }
    })
  }

  checkFirstPassword() {
    this.activated = false;
    this.isPasswordToShort = this.firstPasswordInputString.length < 9
    this.updateGuard();
  }

  checkSecondPassword(){
    this.activated = false;
    this.doPasswordMatch = this.firstPasswordInputString === this.secondPasswordInputString;
    this.updateGuard();
  }

  updateGuard(){
    this.doPasswordsMatchAndValid = this.doPasswordMatch && !this.isPasswordToShort;

    if(this.doPasswordsMatchAndValid && this.isUsernameValid){
      this.activated = true;
    }
  }

}
