import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {
    messages:Message[] = [
        new Message(0, 'Test message', 'This is a test message', 'Jensen'),
        new Message(1, 'Test message 2', 'This is a test message 2', 'Jensen'),
        new Message(2, 'Test message 3', 'This is a test message 3', 'Jensen')
    ];

    onAddMessage(message:Message) {
        this.messages.push(message);
    }
}
