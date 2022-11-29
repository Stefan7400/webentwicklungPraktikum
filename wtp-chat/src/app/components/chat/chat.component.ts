import { Component, OnInit } from '@angular/core';
import { AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { Message } from 'src/app/models/Message';
import { BackendService } from 'src/app/services/backend.service';
import { ContextService } from 'src/app/services/context.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit, AfterViewChecked {
    // private backendService: BackendService = new BackendService(this.http, new ContextService());
    public messages: Array<Message> = [];
    public sameLine: boolean = false;
    public username: string = "";
    public recipient: string = "";

    /*
    constructor(private http: HttpClient) {
    }
    */

    // DIV für Nachrichten (s. Template) als Kind-Element für Aufrufe (s. scrollToBottom()) nutzen
    @ViewChild('messagesDiv') private myScrollContainer: ElementRef;

    public constructor() { 
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
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch(err) { 
        }                 
    }

    private isSameLine(): boolean {
        // TODO: Entscheidung 2 oder 1-zeilige Chatnachrichten (s. SettingsComponent)
        // this.sameLine;
        return false;
    }
    
    private getMessages(): void {
        /*
        this.backendService.listMessages()
        .subscribe((ok: Array<Message>) => {
            if (ok) {
                console.log('loaded messages: ', ok);
                this.messages = ok;
            } else {
                console.log('messages couldn\'t be loaded');
            }
        });
        */
    }



    public ngOnInit(): void {
        // TODO: "15.09.2021 15:00:46   https://angular.io/api/common/DatePipe
        // TODO: send message

        this.messages[0] = new Message("Hallo", "Tom", 1);
        this.messages[1] = new Message("Bye", "Jerry", 2);
        this.messages[2] = new Message("Yes", "Tom", 0);

        this.getMessages();
        this.scrollToBottom();
        this.refresh();
    }

    public removeFriend() {
        // TODO: Bestätigung mit js confirm(), danach -> [routerLink]="['/friends']"
    }

    private refresh() {
        setInterval("this");
    }

}
