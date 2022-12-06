import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BackendService} from "../../services/backend.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  @ViewChild('saveBtn') createBtn! : ElementRef;
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

  private updateSaveButton() : void {
    if(!this.activated){
      this.createBtn.nativeElement.classList.add('savebutton')
      return;
    }

    this.createBtn.nativeElement.classList.remove('savebutton')

  }

  checkUsername() {
      this.activated = false;
      this.updateSaveButton();
      this.isUsernameValid = false
      this.isUsernameTooShort = this.usernameInputString.length !== 0 && this.usernameInputString.length < 3;
      if(this.isUsernameTooShort){
        return;
      }
      this.backendService.userExists(this.usernameInputString).subscribe(data => {
        this.usernameAlreadyUsed = data;

        if(!data){
          this.isUsernameValid = true;

          if(this.doPasswordMatch && !this.isPasswordToShort){
            this.activated = true
          }
        }
        this.updateSaveButton();
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
        this.router.navigate(['/friends'])
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
    this.updateSaveButton();
  }

}
