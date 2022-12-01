import { Component, OnInit } from '@angular/core';
import { BackendService } from "../../services/backend.service";
import { ContextService } from "../../services/context.service"
import { Profile } from "../../models/Profile";
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
                if(parsedUser.coffeeOrTea == 1) {
                    this.coffeOrTea = "Coffee";
                } else if(parsedUser.coffeeOrTea == 2) {
                    this.coffeOrTea = "Tea";
                } else {
                    this.coffeOrTea = "neither";
                }
                //this.coffeOrTea = parsedUser.coffeeOrTea;

                this.description = parsedUser.description;
                
            } else {
                console.log("Current User not found!");
            }
        });
    }

}

// TODO: remove friend after alert/choice