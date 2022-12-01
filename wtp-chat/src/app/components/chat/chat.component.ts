import { Component, OnInit } from '@angular/core';
import { AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'src/app/models/Message';
import { User } from 'src/app/models/User';
import { BackendService } from 'src/app/services/backend.service';
import { ContextService } from 'src/app/services/context.service';
import { IntervalService } from 'src/app/services/interval.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit, AfterViewChecked {
[x: string]: any;
    public messages: Array<Message> = [];
    public sameLine: boolean = false;
    public username: string = "";
    public recipient: string = "";
    public inputMessage: string = "";

    // DIV für Nachrichten (s. Template) als Kind-Element für Aufrufe (s. scrollToBottom()) nutzen
    @ViewChild('messagesDiv') private myScrollContainer: ElementRef;

    public constructor(private backendService: BackendService, private contextService: ContextService,
                        private intervalService: IntervalService, private router: Router) {
        this.myScrollContainer = new ElementRef(null);
    }

    public ngAfterViewChecked() {        
        this.scrollToBottom();        
    } 

    /**
     * Setzt in der Nachrichtenliste die Scrollposition ("scrollTop") auf die DIV-Größe ("scrollHeight"). Dies bewirkt ein 
     * Scrollen ans Ende.
     */
    private scrollToBottom(): void {
        // TODO: scroll to bottom not working
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch(err) { 
        }                 
    }

    private getIsSameLine(): void {
        this.backendService.loadCurrentUser()
        .subscribe((ok: User | null) => {
            if (ok) {
                if(JSON.parse(JSON.stringify(ok)).layout === "1") {
                    this.sameLine = true;
                } else {
                    this.sameLine = false;
                }
            } else {
                console.log('error while getting setting!');
            }
        });
    }

    public ngOnInit(): void {
        this.username = this.contextService.loggedInUsername;
        this.recipient = this.contextService.currentChatUsername;

        this.getIsSameLine();
        this.refresh();

        this.scrollToBottom();
    }

    public ngOnDestroy(): void {
        this.intervalService.clearIntervals();
    }

    public removeFriend() {
        if(confirm('Do you really want to remove ' + this.recipient + ' as a friend?')) {
            this.backendService.removeFriend(this.recipient)
            .subscribe((ok: boolean) => {
                if (ok) {
                    console.log('removed friend ', this.recipient);
                } else {
                    console.log('error while removing!');
                }
            });
            this.router.navigate(['/friends']);
        }
    }

    public sendMessage() {
        this.backendService.sendMessage(this.recipient, this.inputMessage)
        .subscribe((ok: boolean) => {
            if (ok) {
                console.log('sent message: ', this.inputMessage);
            } else {
                console.log('error while sending message!');
            }
        });
        this.inputMessage = '';
    }

    private getMessages(): void {
        this.backendService.listMessages(this.recipient)
        .subscribe((ok: Array<Message>) => {
            if (ok) {
                this.messages = [];
                for (let message of ok) {
                    this.messages.push(message);
                }
            } else {
                console.log('messages couldn\'t be loaded');
            }
        });
    }

    private refresh() {
        this.intervalService.setInterval("chat", () => this.getMessages());
    }

}
