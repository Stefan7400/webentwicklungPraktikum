import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { IntervalService } from 'src/app/services/interval.service';
import { BackendService } from 'src/app/services/backend.service';
import { User } from 'src/app/models/User';
import { Friend } from 'src/app/models/Friend';
import { ContextService } from 'src/app/services/context.service';

@Component({
    selector: 'app-friends',
    templateUrl: './friends.component.html',
    styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
    public users: Array<string> = [];
    public friends: Array<Friend> = [];
    public addedFriendName : string = '';
    public userExists : boolean = true;
    public isSelf : boolean = false;
    public isFriend : boolean = false;
    public curUser: string = '';

    public constructor(private backendService: BackendService, private contextService: ContextService,
            private intervalService: IntervalService) {
    }

    public ngOnInit(): void {
        this.backendService.loadCurrentUser().subscribe((ok: User | null) => {
            if (ok) {
                this.contextService.loggedInUsername = ok.username;
                this.curUser = ok.username;
            } else {
                console.log('User not found!');
            }
        });

        this.refresh();
    }

    public ngOnDestroy(): void {
        this.intervalService.clearIntervals();
    }

    public openUserSpecific(username: string): void {
        this.contextService.currentChatUsername = username;
    }

    public acceptRequest(username: string): void {
        this.backendService.acceptFriendRequest(username).subscribe((ok: boolean) => {
            if (!ok) {
                console.log('error while accepting the request!');
            }
        });
    }

    public declineRequest(username: string): void {
        this.backendService.dismissFriendRequest(username).subscribe((ok: boolean) => {
            if (!ok) {
                console.log('error while declining the request!');
            }
        });
    }

    public autoComplete(username: string): void {
        this.users = [];
        this.addedFriendName = username;

        this.setIsSelf(this.addedFriendName);
        if(!this.isSelf) {
            this.setUserExists(this.addedFriendName);
            this.setIsFriend(this.addedFriendName);
        }
    }

    private isValidInput(): boolean {
      return !this.isSelf && this.userExists && !this.isFriend
    }

    public addFriend(): void {
        if (this.isValidInput()) {
            this.backendService.friendRequest(this.addedFriendName).subscribe((ok: boolean) => {
                if (!ok) {
                    console.log('error while adding friend!');
                }
            });
            this.addedFriendName = '';
        } else {
            console.log('invalid input! did not add friend');
        }
    }

    private getFriends(): void {
        this.backendService.loadFriends().subscribe((ok: Array<Friend>) => {
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

        this.backendService.unreadMessageCounts().subscribe((ok: Map<string, number>) => {
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

    private setIsSelf(username: string): void {
        if(this.contextService.loggedInUsername == username) {
            this.isSelf = true;
        } else {
            this.isSelf = false;
        }
    }

    private setUserExists(username: string): void {
        this.backendService.userExists(username).subscribe((ok: boolean) => {
            if (ok) {
                this.userExists = true;
                return;
            } else {
                console.log('user does not exist!');
            }
        });
        this.userExists = false;
    }

    private isAlreadyFriend(username : String) : boolean{
        for (let i=0; i < this.friends.length; i++) {
            if (this.friends[i].username === username) {
                return true;
            }
        }
        return false;
    }

    private setIsFriend(username: string): void {
        this.isFriend = this.isAlreadyFriend(username);
    }

    private setRecommend(): void {
        this.backendService.listUsers().subscribe((ok: Array<string>) => {
            if (ok) {
                for(let i=0; i < ok.length; i++) {
                    if (this.contextService.loggedInUsername !== ok[i] && !this.isAlreadyFriend(ok[i]) &&
                        ok[i].substring(0, this.addedFriendName.length).toLowerCase() === this.addedFriendName.toLowerCase()) {
                        this.users.push(ok[i]);
                    }
                }
            } else {
                console.log('error while listing users!');
            }
        });
    }

    public setIsValidInput(): void {
        this.setIsSelf(this.addedFriendName);
        if(!this.isSelf) {
            this.setUserExists(this.addedFriendName);
            this.setIsFriend(this.addedFriendName);
        }

        this.users = [];
        if (this.addedFriendName !== '') {
            this.setRecommend();
        }
    }

    private refresh() {
        this.intervalService.setInterval("friends", () => this.getFriends());
    }

}
