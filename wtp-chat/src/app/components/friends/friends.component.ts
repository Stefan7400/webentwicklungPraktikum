import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { IntervalService } from 'src/app/services/interval.service';
import { BackendService } from 'src/app/services/backend.service';
import { User } from 'src/app/models/User';
import { Friend } from 'src/app/models/Friend';

@Component({
    selector: 'app-friends',
    templateUrl: './friends.component.html',
    styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
    public friends: Array<Friend> = [];
    public addedFriendName : string = '';
    public userExists : boolean = false;
    public isSelf : boolean = false;
    public isFriend : boolean = false;
    private curUser : any;

    public constructor(private backendService: BackendService, private intervalService: IntervalService) {
        intervalService.setInterval("friends", () => this.getFriends());
    }

    public ngOnInit(): void {
        this.backendService.loadCurrentUser()
        .subscribe((ok: User | null) => {
            if (ok) {
                this.curUser = ok;
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

    private getIsSelf(username: string): void {
        if(this.curUser.username == username) {
            this.isSelf = true;
        } else {
            this.isSelf = false;
        }
    }

    private getUserExists(username: string): void {
        this.backendService.userExists(username)
        .subscribe((ok: boolean) => {
            // TODO: skips this when adding??
            console.log('getUserExists: ', ok);
            if (ok) {
                console.log('user exists: ', username);
                this.userExists = true;
                return;
            } else {
                console.log('user does not exist!');
            }
        });
        this.userExists = false;
    }

    private getIsFriend(username: string): void {
        for (let i=0; i < this.friends.length; i++) {
            if (this.friends[i].username === username) {
                this.isFriend = true;
                return;
            }
        }
        this.isFriend = false;
    }

    public isValidInput(): boolean {
        this.getIsSelf(this.addedFriendName);
        if(!this.isSelf) {
            this.getUserExists(this.addedFriendName);
            this.getIsFriend(this.addedFriendName);
            if (this.userExists && !this.isFriend) {
                return true;
            } else {
                return false;
            }
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
            console.log('invalid input! did not add friend');
        }
    }

    public getFriends(): void {
        this.backendService.loadFriends()
        .subscribe((ok: Array<Friend>) => {
            if (ok) {
                this.friends = [];
                for (let receivedFriend of ok) {
                    this.friends.push(receivedFriend);
                }
                for (let i=0; i < this.friends.length; i++) {
                    this.friends[i].unreadMessages = 0;
                }
            } else {
                console.log('friends couldn\'t be loaded');
            }
        });

        this.backendService.unreadMessageCounts()
        .subscribe((ok: Map<string, number>) => {
            if (ok) {
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