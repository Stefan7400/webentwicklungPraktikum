import { Component, OnInit } from '@angular/core';
import { BackendService } from "../../services/backend.service";
import { ContextService } from "../../services/context.service"
import { Router } from "@angular/router";
import { Profile } from "../../models/Profile";
import { User } from "../../models/User";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    
    currentProfile: Profile = new Profile("Unknown", "User", '1', "Loreleis Opossum Dolores, sie atmet!", "oneLine"); //dummy data
    firstName: String = this.currentProfile.firstName; 
    lastName: String = this.currentProfile.lastName; 
    coffeOrTea: String = this.currentProfile.coffeeOrTea;
    description: String = this.currentProfile.description;
    layout: String = this.currentProfile.layout;
        
    
    public constructor(private backendService: BackendService, private contextService: ContextService) {}

    public ngOnInit(): void {
        // TODO: pre set radio button on oneLine and Select on neitherNor aaand enable change again
        // TODO: load user profile!? and set data accordingly
        // TODO: if reload profile page dont log out
        this.backendService.loadCurrentUser().subscribe((user) => {
            if (user != null) {
                this.contextService.loggedInUsername = user.username;
                this.firstName = user.username;

                console.log("Current User is: ", user.username);
            } else {
                console.log("Current User not found!");
            }
        });
    }

    public saveProfile(): void {
        this.backendService.saveCurrentUserProfile(this.currentProfile);
    }
}