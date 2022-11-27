import { Component, OnInit } from '@angular/core';
import {BackendService} from "../../services/backend.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    authFailed: boolean = false;
    usernameInput : string = "";
    passwordInput : string = "";


    public constructor(private backendService : BackendService,private router : Router) {
    }

    public ngOnInit(): void {
    }

    public onLogin(){

      if(this.usernameInput.length === 0 || this.passwordInput.length === 0){
        return;
      }


      this.backendService.login(this.usernameInput,this.passwordInput).subscribe(data => {
        this.authFailed = !data;

        if(data){
          this.router.navigate(['/friends'])
        }
      })
    }

  onInput() {
    this.authFailed = false;
  }
}
