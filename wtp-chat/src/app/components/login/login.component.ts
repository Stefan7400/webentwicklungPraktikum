import { Component, OnInit } from '@angular/core';
import {BackendService} from "../../services/backend.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    authFailed: boolean = false;
    usernameInput : string = "";
    passwordInput : string = "";


    public constructor(private backendService : BackendService) {
    }

    public ngOnInit(): void {
    }

    public onLogin(){
      this.backendService.login(this.usernameInput,this.passwordInput).subscribe(data => {
        this.authFailed = !data;
      })
    }

  onInput() {
    this.authFailed = false;
  }
}
