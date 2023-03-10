import { outputAst } from '@angular/compiler';
import { Subject } from 'rxjs';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

    constructor(private http:HttpClient ) {
        //this.documents = MOCKDOCUMENTS;
        this.maxDocumentId = this.getMaxId();
    }

    getDocuments() {
        this.http.get("https://asjcms-a34a0-default-rtdb.firebaseio.com/documents.json")
        .subscribe(
            (documents:Document[]) => {
                this.documents = documents;
                this.maxDocumentId = this.getMaxId();
                this.documents.sort((a, b)=> (a < b ? -1 : a > b ? 1 : 0));//if a>b: -1, a>b: 1, else: 0
                this.documentListChangedEvent.next(this.documents.slice());
                this.documents = JSON.parse(JSON.stringify(this.documents));
            },
            (error:any) => {
                console.log(error)
            }
        )
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
        this.storeDocuments(documentsListClone);
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
        this.storeDocuments(documentsListClone);
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
        this.storeDocuments(documentsListClone)
    }

    storeDocuments(documents:Document[]){
        const docString = JSON.stringify(documents);
        const headers = new HttpHeaders({"Content-Type":"application/json"});
        this.http.put("https://asjcms-a34a0-default-rtdb.firebaseio.com/documents.json",docString,{headers})
        .subscribe(
            (res) => {
                this.documentListChangedEvent.next(this.documents.slice()), res;
            },
            (error) => {
                console.log(error);
            }
        )
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
