import { Component, Input, OnInit,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from '../message.model';
import { ContactService } from '../../contacts/contact.service';
import { Contact } from '../../contacts/contact.model';

@Component({
    selector: 'app-message-item',
    templateUrl: './message-item.component.html',
    styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit, OnDestroy {
    @Input() message: Message;
    messageSender: string;
    subscription:Subscription;

    constructor(private contactService: ContactService) { }

    ngOnInit() {
        let contact: Contact = this.contactService.getContact(this.message.sender);
        this.messageSender = contact?.name;
        this.subscription = this.contactService.contactListChangedEvent
        .subscribe(() => {
            contact = this.contactService.getContact(this.message.sender);
            this.messageSender = contact.name
        })
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }
}
