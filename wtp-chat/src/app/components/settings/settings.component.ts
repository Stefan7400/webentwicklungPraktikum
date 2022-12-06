import { Component, OnInit } from '@angular/core';
import { BackendService } from "../../services/backend.service";
import { ContextService } from "../../services/context.service"
import { Profile } from "../../models/Profile";
import { User } from "../../models/User";


@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

    public firstName: string = "";
    public lastName: string = "";
    public coffeOrTea: string = "";
    public description: string = "";
    public layout: string = "";
    public currentUserProfile: Profile = new Profile(this.firstName, this.lastName, this.coffeOrTea, this.description, this.layout);
    public currentUser: User = new User();
    savedMessage : string = "";

    public constructor(private backendService: BackendService, private contextService: ContextService) { }

    public ngOnInit(): void {
        this.backendService.loadCurrentUser().subscribe((user) => {
            if (user != null) {
                this.contextService.loggedInUsername = user.username;
                this.currentUser = user;
                console.log("Current User is: ", user);
                // assign values
                const parsedUser =  JSON.parse(JSON.stringify(this.currentUser));

                this.firstName = parsedUser.firstName;
                this.lastName = parsedUser.lastName;
                this.coffeOrTea = parsedUser.coffeeOrTea;
                this.description = parsedUser.description;
                this.layout = parsedUser.layout;

            } else {
                console.log("Current User not found!");
            }
        });
    }

    public saveProfile(): void {
        this.currentUserProfile.firstName = this.firstName;
        this.currentUserProfile.lastName = this.lastName;
        this.currentUserProfile.coffeeOrTea = this.coffeOrTea;
        this.currentUserProfile.description = this.description;
        this.currentUserProfile.layout = this.layout;
        this.backendService.saveCurrentUserProfile(this.currentUserProfile).subscribe((success) => {
            if (success) {
                console.log("saving sucessfull, new data: ", this.currentUserProfile);
                this.highlightSave();
            } else {
                console.log("error while saving profile");
            }
        });
    }

    public highlightSave() : void{
      this.savedMessage = "Saved changes!"
      setTimeout(() => {
        this.savedMessage = ""
      },3000);
  }
}
