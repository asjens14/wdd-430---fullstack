import { Component, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
    documents:Document[] = [];
    subscription: Subscription;

    constructor(private documentService:DocumentService){}

    ngOnInit() {
        this.documents = this.documentService.getDocuments();
        // this.documentService.documentChangedEvent.subscribe((documents:Document[])=>{
        //     this.documents = documents;
        // })
        this.subscription = this.documentService.documentListChangedEvent
        .subscribe((documents:Document[]) => {
            this.documents = documents;
        })
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }
}
