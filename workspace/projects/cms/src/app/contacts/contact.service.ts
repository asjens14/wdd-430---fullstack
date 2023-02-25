import { Injectable, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    contactSelectedEvent = new Subject<Contact>();
    // @Output() contactChangedEvent = new EventEmitter<Contact[]>();
    
    contactListChangedEvent = new Subject<Contact[]>();
    contacts: Contact[] = [];
    maxContactId: number;

    constructor() {
        this.contacts = MOCKCONTACTS;
    }

    getContacts(): Contact[] {
        return this.contacts.slice();
    }

    getContact(id: string) {
        for (let contact of this.contacts) {
            if (contact.id == id) {
                return contact;
            }
        }
        return null;
    }

    deleteContact(contact: Contact) {
        if (!document) {
            return;
        }
        const pos = this.contacts.indexOf(contact);
        if (pos < 0) {
            return;
        }
        this.contacts.splice(pos, 1);
        this.contactChangedEvent.emit(this.contacts.slice());
        for (let contact of this.contacts) {
            let currentId = parseInt(contact.id);
            if (currentId > maxId){
                maxId = currentId;
            }
        }
        return maxId;
    }
}
