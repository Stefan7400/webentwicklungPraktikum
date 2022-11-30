import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContextService } from 'src/app/services/context.service';
import { BackendService } from 'src/app/services/backend.service';
import { User } from 'src/app/models/User';
import { Friend } from 'src/app/models/Friend';
import { timeout } from 'rxjs';
import { IntervalService } from 'src/app/services/interval.service';

@Component({
    selector: 'app-friends',
    templateUrl: './friends.component.html',
    styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
    public friends: Array<Friend> = [];
    public addedFriendName : string = '';
    public userExists : boolean = false;
    public isFriend : boolean = false;

    public constructor(private backendService: BackendService, private intervalService: IntervalService) {
        intervalService.setInterval("friends", () => this.getFriends());
    }

    public ngOnInit(): void {
        this.backendService.loadCurrentUser()
        .subscribe((ok: User | null) => {
            if (ok) {
                console.log('current User found: ', ok);
            } else {
                console.log('User not found!');
            }
        });

        this.getFriends();
    }

    public acceptRequest(username: string): void {
        this.backendService.acceptFriendRequest(username)
        .subscribe((ok: boolean) => {
            if (ok) {
                console.log('accepted request: ', username);
            } else {
                console.log('error while accepting the request!');
            }
        });

    }

    public declineRequest(username: string): void {
        this.backendService.dismissFriendRequest(username)
        .subscribe((ok: boolean) => {
            if (ok) {
                console.log('declined request: ', username);
            } else {
                console.log('error while declining the request!');
            }
        });
    }

    
    private getUserExists(username: string): void {
        this.backendService.userExists(username)
        .subscribe((ok: boolean) => {
            console.log(ok);
            if (ok) {
                console.log('user exists: ', username);
                this.userExists = true;
            } else {
                console.log('user does not exist!');
                this.userExists = false;
            }
        });
        console.log('hasUser error');   //TODO bugged
        this.userExists = false;
    }

    private getIsFriend(username: string): void {
        console.log('isFriend');
        for (let i=0; i < this.friends.length; i++) {
            if (this.friends[i].username === username) {
                console.log('already your friend');
                this.isFriend = true;
            }
        }
        this.isFriend = false;
    }

    public isValidInput(): boolean {
        this.getUserExists(this.addedFriendName);
        this.getIsFriend(this.addedFriendName);
        if (this.userExists && !this.isFriend) {
            return true;
        } else {
            return false;
        }
    }

    public addFriend(): void {
        console.log(this.addedFriendName);
        if (this.isValidInput()) {
            this.backendService.friendRequest(this.addedFriendName)
            .subscribe((ok: boolean) => {
                if (ok) {
                    console.log('added friend: ', this.addedFriendName);
                } else {
                    console.log('error while adding friend!');
                }
            });
        } else {
            console.log('not valid input! did not add friend');
        }
    }

    public getFriends(): void {
        this.backendService.loadFriends()
        .subscribe((ok: Array<Friend>) => {
            if (ok) {
                console.log('loaded friends: ', ok);
                for(let receivedFriend of ok){
                    this.friends.push(receivedFriend);
                }
                for (let i=0; i < this.friends.length; i++) {
                    this.friends[i].unreadMessages = 0;
                }
            } else {
                console.log('friends couldn\'t be loaded');
            }
        });

        console.log(this.friends);

        this.backendService.unreadMessageCounts()
        .subscribe((ok: Map<string, number>) => {
            if (ok) {
                console.log('loaded message count: ', ok);
                let messageCount;
                for (let i=0; i < this.friends.length; i++) {
                    messageCount = ok.get(this.friends[i].username);
                    if(messageCount !== undefined) {
                        this.friends[i].unreadMessages = messageCount;
                    }
                }
            } else {
                console.log('message count couldn\'t be loaded');
            }
        }); 
    }

}