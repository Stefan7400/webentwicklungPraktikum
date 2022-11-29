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
    backendService: BackendService = new BackendService(this.http, new ContextService());
    public friends: Array<Friend> = [];
    public friendName : string = '';

    constructor(private http: HttpClient) {
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

    public addFriend(): void {
        this.backendService.friendRequest(this.friendName)
        .subscribe((ok: boolean) => {
            if (ok) {
                console.log('added friend: ', this.friendName);
            } else {
                console.log('error while adding friend!');
            }
        });
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

        
        this.friends[0] = new Friend("Tom", "accepted", 5);
        this.friends[1] = new Friend("Jerry", "accepted", 1);
        this.friends[2] = new Friend("Lena", "requested", 3);
        this.friends[3] = new Friend("Marvin", "accepted", 10);
        this.friends[4] = new Friend("ABC", "requested", 12);
        

        // this.getFriends();
        this.refresh();
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
        //TODO
        setInterval("this");
    }

}