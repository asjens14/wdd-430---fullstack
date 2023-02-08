import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
    selector: 'app-message-list',
    templateUrl: './message-list.component.html',
    styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
    messages: Message[] = [
        // new Message('0', 'Test message', 'This is a test message', 'Jensen'),
        // new Message('1', 'Test message 2', 'This is a test message 2', 'Jensen'),
        // new Message('2', 'Test message 3', 'This is a test message 3', 'Jensen')
    ];

    constructor(private messageService: MessageService) { }

    ngOnInit() {
        this.messages = this.messageService.getMessages();
    }

    onAddMessage(message: Message) {
        this.messages.push(message);
    }
}
