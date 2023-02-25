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
        if (!contact) {
            return;
        }
        let pos = this.contacts.indexOf(contact);
        if (pos < 0) {
            return;
        }
        this.contacts.splice(pos, 1);
        let contactsListClone = this.contacts.slice();
        this.contactListChangedEvent.next(contactsListClone);
        // this.contactChangedEvent.emit(this.contacts.slice());
    }

    addContact(newContact:Contact){
        if (!newContact){
            return;
        }

        this.maxContactId++;
        newContact.id = this.maxContactId.toString();
        this.contacts.push(newContact);
        let contactsListClone = this.contacts.slice();
        this.contactListChangedEvent.next(contactsListClone);
    }

    updateDocument(originalContact:Contact, newContact:Contact){
        if (!originalContact || !newContact){
            return;
        }
        let pos = this.contacts.indexOf(originalContact);
        
        if (pos < 0){
            return;
        }

        newContact.id = originalContact.id;
        this.contacts[pos] = newContact;
        let contactsListClone = this.contacts.slice();
        this.contactListChangedEvent.next(contactsListClone)
    }

    getMaxId():number {
        let maxId = 0;
        for (let contact of this.contacts) {
            let currentId = parseInt(contact.id);
            if (currentId > maxId){
                maxId = currentId;
            }
        }
        return maxId;
    }
}
