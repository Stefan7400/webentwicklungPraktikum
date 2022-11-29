import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContextService } from 'src/app/services/context.service';
import { BackendService } from 'src/app/services/backend.service';
import { User } from 'src/app/models/User';
import { Friend } from 'src/app/models/Friend';

@Component({
    selector: 'app-friends',
    templateUrl: './friends.component.html',
    styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
    private backendService: BackendService = new BackendService(this.http, new ContextService());
    public friends: Array<Friend> = [];
    public addedFriendName : string = '';
    public userExists : boolean = false;
    public isInFriendlist : boolean = false;

    constructor(private http: HttpClient) {
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
        this.refresh();
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

    
    private hasUser(username: string): boolean {
        this.backendService.userExists(username)
        .subscribe((ok: boolean) => {
            if (ok) {
                console.log('user exists: ', username);
                this.userExists = true;
                return true;
            } else {
                console.log('user does not exist!');
                this.userExists = false;
                return false;
            }
        });
        this.userExists = false
        return false;
    }

    private isFriend(username: string): boolean {
        for (let i=0; i < this.friends.length; i++) {
            if (this.friends[i].username === username) {
                this.isInFriendlist = true;
                return true;
            }
        }
        this.isInFriendlist = false;
        return false;
    }

    public isValidInput(): boolean {
        if (this.hasUser(this.addedFriendName) && !this.isFriend(this.addedFriendName)) {
            return true;
        } else {
            return false;
        }
    }

    public addFriend(): void {
        if (this.isValidInput()) {
            this.backendService.friendRequest(this.addedFriendName)
            .subscribe((ok: boolean) => {
                if (ok) {
                    console.log('added friend: ', this.addedFriendName);
                } else {
                    console.log('error while adding friend!');
                }
            });
        }
    }

    private getFriends(): void {
        this.backendService.loadFriends()
        .subscribe((ok: Array<Friend>) => {
            if (ok) {
                console.log('loaded friends: ', ok);
                this.friends = ok;
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

    private refresh() {
        setInterval("this");
    }

}