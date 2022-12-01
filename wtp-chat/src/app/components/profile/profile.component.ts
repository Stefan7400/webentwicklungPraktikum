import { Component, OnInit } from '@angular/core';
import { BackendService } from "../../services/backend.service";
import { ContextService } from "../../services/context.service"
import { User } from "../../models/User";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    public username: string = "";
    public firstName: string = "";
    public lastName: string = "";
    public coffeOrTea: string = "";
    public description: string = "";
    public currentUser: User = new User();

    public constructor(private backendService: BackendService, private contextService: ContextService) { }

    public ngOnInit(): void {

        this.username = this.contextService.currentChatUsername;

        this.backendService.loadUser(this.username).subscribe((user) => {
            if (user != null) {
                this.currentUser = user;
                console.log("Current Profile is: ", user);
                // assign values
                const parsedUser = JSON.parse(JSON.stringify(this.currentUser));
                this.firstName = parsedUser.firstName;
                this.lastName = parsedUser.lastName;
                this.description = parsedUser.description;
                if (parsedUser.coffeeOrTea == 1) {
                    this.coffeOrTea = "Coffee";
                } else if (parsedUser.coffeeOrTea == 2) {
                    this.coffeOrTea = "Tea";
                } else {
                    this.coffeOrTea = "neither";
                }
            } else {
                console.log("Current User not found!");
            }
        });
    }

    public removeFriend(): void {

        if (confirm("Are you sure, you want to remove " + this.username + " from your friend list?")) {
            this.backendService.removeFriend(this.username).subscribe((valid) => {
                if (valid) {
                    console.log("user " + this.username + " removed!");
                } else {
                    console.log("error while removing friend");
                }
            });
        }
    }

}

// TODO: remove friend after alert/choice