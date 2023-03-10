import { Injectable, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

    constructor(private http:HttpClient) {
        // this.contacts = MOCKCONTACTS;
        this.contacts = this.getContacts();
        this.maxContactId = this.getMaxId();
    }

    getContacts() {
        this.http.get("https://asjcms-a34a0-default-rtdb.firebaseio.com/contacts.json")
        .subscribe(
            (contacts:Contact[]) => {
                this.contacts = contacts;
                this.maxContactId = this.getMaxId();
                this.contacts.sort((a, b)=> (a < b ? -1 : a > b ? 1 : 0));//if a>b: -1, a>b: 1, else: 0
                this.contactListChangedEvent.next(this.contacts.slice());
                this.contacts = JSON.parse(JSON.stringify(this.contacts));
            },
            (error:any) => {
                console.log(error)
            }
        )
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
        this.storeContacts(contactsListClone);
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
        this.storeContacts(contactsListClone);
    }

    updateContact(originalContact:Contact, newContact:Contact){
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
        this.storeContacts(contactsListClone)
    }

    storeContacts(contacts:Contact[]){
        const conString = JSON.stringify(contacts);
        const headers = new HttpHeaders({"Content-Type":"application/json"});
        this.http.put("https://asjcms-a34a0-default-rtdb.firebaseio.com/contacts.json",conString,{headers})
        .subscribe(
            (res) => {
                this.contactListChangedEvent.next(this.contacts.slice()), res;
            },
            (error) => {
                console.log(error);
            }
        )
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
