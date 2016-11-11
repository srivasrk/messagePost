import {Component, OnInit} from "@angular/core";
import {Message} from "./message.model";
import {MessageService} from "./message.service";

@Component({
    selector:'app-message-list',
    template: `
        <div class="col-md-8 col-md-offset-2">
            <app-message
                    [message]="message"
                    *ngFor="let message of messages">
            </app-message>    
        </div>          
    `
})
export class MessageListComponent implements OnInit{
    messages: Message[];

    constructor(private messageService: MessageService){}

    ngOnInit(){
        //in JS, arrays are referenced. It means here we are pointing
        //to the same array provided/created in the message service
        this.messageService.getMessage()
            .subscribe((messages: Message[]) => {
                this.messages = messages;
            });
    }
}