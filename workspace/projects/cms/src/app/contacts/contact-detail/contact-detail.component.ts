import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Contact} from '../contact.model';
import { ContactService } from '../contact.service';
@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit{
    // @Input() contact:Contact;
    // contacts: Contact[] = [];
    id: number;
    contact: Contact;

    constructor(
        private contactService:ContactService,
        private route: ActivatedRoute,
        private router: Router
        ){}

    ngOnInit() {
        this.route.params.subscribe((params: Params) =>{
            this.id = +params['id'];
            this.contact = this.contactService.getContact(this.id.toString());
            console.log(this.id);
        })
    }
}
