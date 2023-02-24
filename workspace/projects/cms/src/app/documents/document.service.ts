import { outputAst } from '@angular/compiler';
import { Subject } from 'rxjs';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
    providedIn: 'root'
})
export class DocumentService {
    documentSelectedEvent = new Subject<Document>();
    // @Output() documentChangedEvent = new EventEmitter<Document[]>();
    
    documentListChangedEvent = new Subject<Document[]>();
    documents: Document[] = [];
    maxDocumentId: number;

    constructor() {
        this.documents = MOCKDOCUMENTS;
        this.maxDocumentId = this.getMaxId();
    }

    getDocuments() {
        return this.documents.slice();
    }

    getDocument(id: string) {
        for (let document of this.documents) {
            if (document.id == id) {
                return document;
            }
        }
        return null;
    }

    deleteDocument(document: Document) {
        if (!document) {
            return;
        }
        let pos = this.documents.indexOf(document);
        if (pos < 0) {
            return;
        }
        this.documents.splice(pos, 1);
        let documentsListClone = this.documents.slice();
        this.documentListChangedEvent.next(documentsListClone)
        // this.documentChangedEvent.emit(this.documents.slice());
    }

    addDocument(newDocument:Document){
        if (!newDocument){
            return;
        }

        this.maxDocumentId++;
        newDocument.id = this.maxDocumentId.toString();
        this.documents.push(newDocument);
        let documentsListClone = this.documents.slice();
        this.documentListChangedEvent.next(documentsListClone);
    }

    updateDocument(originalDocument:Document, newDocument:Document){
        if (!originalDocument || !newDocument){
            return;
        }
        let pos = this.documents.indexOf(originalDocument);
        
        if (pos < 0){
            return;
        }

        newDocument.id = originalDocument.id;
        this.documents[pos] = newDocument;
        let documentsListClone = this.documents.slice();
        this.documentListChangedEvent.next(documentsListClone)
    }

    getMaxId():number {
        let maxId = 0;
        for (let document of this.documents) {
            let currentId = parseInt(document.id);
            if (currentId > maxId){
                maxId = currentId;
            }
        }
        return maxId;
    }
}
